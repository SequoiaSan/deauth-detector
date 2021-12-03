import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from 'moment';
import * as _ from 'lodash';

import LastAttackInfo from "../../components/DeauthDetector/LastAttackInfo";
import AttackInfoBarChart from '../../components/DeauthDetector/AttackInfoBarChart';
import AttackInfoLineChart from '../../components/DeauthDetector/AttackInfoLineChart';
import AttackInfoTable from '../../components/DeauthDetector/AttackInfoTable';
import GridContainer from "../../components/Grid/GridContainer.js";

let packetReasons = [
  'Reserved',
  'Unspecified reason',
  'Previous authentication no longer valid',
  'Deauthenticated because sending station (STA) is leaving or has left Independent Basic Service Set (IBSS) or ESS',
  'Disassociated due to inactivity',
  'Disassociated because WAP device is unable to handle all currently associated STAs',
  'Class 2 frame received from nonauthenticated STA',
  'Class 3 frame received from nonassociated STA',
  'Disassociated because sending STA is leaving or has left Basic Service Set (BSS)',
  'STA requesting (re)association is not authenticated with responding STA',
  'Disassociated because the information in the Power Capability element is unacceptable',
  'Disassociated because the information in the Supported Channels element is unacceptable',
  'Disassociated due to BSS Transition Management',
  'Invalid element, that is, an element defined in this standard for which the content does not meet the specifications in Clause 8',
  'Message integrity code (MIC) failure',
  '4-Way Handshake timeout',
  'Group Key Handshake timeout',
  'Element in 4-Way Handshake different from (Re)Association Request/ Probe Response/Beacon frame',
  'Invalid group cipher',
  'Invalid pairwise cipher',
  'Invalid AKMP',
  'Unsupported RSNE version',
  'Invalid RSNE capabilities',
  'IEEE 802.1X authentication failed',
  'Cipher suite rejected because of the security policy'
];

function getPacketReason(paketType) {
  if(typeof paketType == 'number')
  {
    return packetReasons[paketType];
  }

  return paketType;
}

const Dashboard = () => {
  const [lastAttackData, setLastAttackData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [barChartData, setBarChartData] = useState({ labels: [], series: [] });
  const [lineChartData, setLineChartData] = useState({ labels: [], series: [] });

  useEffect(() => {
    (async () => {
      const response = await Axios.get('http://localhost:5000/attacks');
      
      response.data.lastAttack['type'] = getPacketReason(response.data.lastAttack['type']);
      updateLastAttackData(response.data.lastAttack);
      updateBarChartData(response.data.deauthAttacks);
      updateLineChartData(response.data.deauthAttacks);
      updateTableData(response.data.deauthAttacks);
    })();
  }, []);


  /**
   * Updates the last attack state with the details of the most recent attack
   * @param lastAttack 
   */
  const updateLastAttackData = lastAttackData => {
    let { timestamp } = lastAttackData;
    timestamp = moment.unix(timestamp).format('MM/DD/YYYY HH:mm');
    lastAttackData.timestamp = timestamp;
    setLastAttackData(lastAttackData);
  };

  /**
   * Updates the table state with deauthentication attack history
   * @param deauthAttacks
   */
  const updateTableData = deauthAttacks => {
    // Format the deauth attack history data to be displayed in the table and update the table data state
    let attackNumber = 0;
    const deauthTableData = [];
    deauthAttacks.forEach(deauthAttack => {
      // Increment attack number
      attackNumber++;

      // Destructure attack data from API results and add to the table data
      const { timestamp, type, signalStrength, channelFlags, victim, victimInfo, router, routerInfo } = deauthAttack;
      const formattedTimestamp = moment.unix(timestamp).format('MM/DD/YYY HH:mm');
      deauthTableData.push([attackNumber, formattedTimestamp, getPacketReason(type), signalStrength, channelFlags, victim, victimInfo['company_name'], router, routerInfo['company_name']]);
    });
    setTableData(deauthTableData);
  };

  /**
   * Updates bar chart state with data from deauthentication attack history
   * @param deauthAttacks
   */
  const updateBarChartData = deauthAttacks => {
    let deauthBarChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let deauthBarChartLabels = [];
    const currentTime = moment(moment().valueOf());

    // Update bar chart data with the number of attacks that have happened over the last 10 days
    _.forEach(deauthAttacks, deauthAttack => {
      // Get the number of days since the attack happened
      const timeOfAttack = moment.unix(deauthAttack.timestamp);
      const differenceInDays = currentTime.diff(timeOfAttack, 'days');

      // Exit the loop once the number of days since the attack is greater than 9
      if (differenceInDays > 9) {
        return false;
      } else {
        deauthBarChartData[differenceInDays]++;
      }
    });

    // Update the table labels with the correct dates
    _.forEach(deauthBarChartData, (value, index) => {
      const label = moment().subtract(index, 'd').format('MM/DD/YY');
      deauthBarChartLabels.push(label);
    });

    // Reverse chart data and labels so that they appear in ascending order
    deauthBarChartData = _.reverse(deauthBarChartData);
    deauthBarChartLabels = _.reverse(deauthBarChartLabels);

    setBarChartData({ labels: deauthBarChartLabels, series: [deauthBarChartData] });
  };

  /**
   * Updates line chart state with data from deauthentication attack history for that current day
   * @param deauthAttacks
   */
  const updateLineChartData = deauthAttacks => {
    let deauthLineChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let deauthLineChartLabels = [];
    const currentTime = moment(moment().valueOf());

    // Update line chart data with the number of attacks that have happened over the last 10 days
    _.forEach(deauthAttacks, deauthAttack => {
      // Get the number of days since the attack happened
      const timeOfAttack = moment.unix(deauthAttack.timestamp);
      const differenceInHours = currentTime.diff(timeOfAttack, 'hours');

      // Exit the loop once the number of days since the attack is greater than 9
      if (differenceInHours > 11) {
        return false;
      } else {
        deauthLineChartData[differenceInHours]++;
      }
    });

    // Update the table labels with the correct dates
    _.forEach(deauthLineChartData, (value, index) => {
      const label = moment().subtract(index, 'h').format('hh a');
      deauthLineChartLabels.push(label);
    });

    // Format chart data and labels so that they appear in ascending order
    deauthLineChartData = _.reverse(deauthLineChartData);
    deauthLineChartLabels = _.reverse(deauthLineChartLabels);

    setLineChartData({ labels: deauthLineChartLabels, series: [deauthLineChartData] });
  };

  return (
    <div>
      <LastAttackInfo lastAttackData={lastAttackData} />
      <GridContainer>
        <AttackInfoBarChart barChartData={barChartData} />
        <AttackInfoLineChart lineChartData={lineChartData} />
      </GridContainer>
      <GridContainer>
        <AttackInfoTable tableData={tableData} />
      </GridContainer>
    </div>
  );
};

export default Dashboard;

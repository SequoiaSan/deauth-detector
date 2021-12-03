import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import GridItem from "../Grid/GridItem.js";
import GridContainer from "../Grid/GridContainer.js";
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardIcon from "../Card/CardIcon.js";
import CardFooter from "../Card/CardFooter.js";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const LastAttackInfo = ({ lastAttackData }) => {
  const classes = useStyles();

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>watch_later</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Time of Previous Attack</p>
              <h3 className={classes.cardTitle}>{lastAttackData['timestamp']}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>info</Icon>
                Time that most recent de-authentication attack occurred.
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>report</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>
                Packet Type
              </p>
              <h3 className={classes.cardTitle}>{lastAttackData['type']}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>info</Icon>
                Type of the packet used in the most recent attack.
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>network_wifi</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Signal Strength</p>
              <h3 className={classes.cardTitle}>{lastAttackData['signalStrength']}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>info</Icon>
                Signal strength.
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>data_object</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Channel Flags</p>
              <h3 className={classes.cardTitle}>{lastAttackData['channelFlags']}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>info</Icon>
                Channel flags.
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
      <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>router</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Victims MAC Address</p>
              <h3 className={classes.cardTitle}>{lastAttackData['victim']}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>info</Icon>
                MAC address of the victim of the attack.
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>factory</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Victim's Device Company Name</p>
              <h3 className={classes.cardTitle}>{lastAttackData.victimInfo ? lastAttackData.victimInfo.company_name : ''}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>info</Icon>
                Company that manufactured the victim device.
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>router</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Attacker's Router MAC Address</p>
              <h3 className={classes.cardTitle}>{lastAttackData['router']}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>info</Icon>
                MAC address of the client.
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>factory</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>
                Attacker's Router Company Name
              </p>
              <h3 className={classes.cardTitle}>{lastAttackData.routerInfo ? lastAttackData.routerInfo.company_name : ''}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>info</Icon>
                Company that manufactured the attacking router.
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default LastAttackInfo;
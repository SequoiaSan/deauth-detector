import sys
import time
import scapy.all as scapy
import json
import os

from pymongo import MongoClient
from requests import get

# MongoDB connection
client = MongoClient('localhost', 27017)
db = client['deauth_attacks']
attacks = db.attacks

# Router mac
HARDCODED_ROUTER_MAC = os.environ.get('defaultRouterMacAdress')

# Monitor mode wifi card
monitor_device = os.environ.get('monitorDevice')

class DeauthenticationDetector:
    def __init__(self, *args, **kwargs):
        '''
        All Arguments And Keywords Will Directly Passed To
        Python Scapy Sniff Function.

        '''
        self.args = args
        self.kwargs = kwargs
        self.data = {}
        self.Sniffing_Start()

    def extract_packets(self, pkt):
        '''
        Function For Extracting Packets.
          This Function Is Specially Created For Filtering 
          Deauthentication Packets.
        '''
        if pkt.haslayer(scapy.Dot11Deauth) and pkt.addr2 is not None and pkt.addr3 is not None:
            addr1 = pkt.addr1
            addr2 = pkt.addr2
            flag = str(pkt.ChannelFlags)
            self.save_packet(addr1, addr2, pkt.dBm_AntSignal, flag, pkt.len, pkt.reason)

        return

    def Sniffing_Start(self):
        '''
        Function For Creating Python Scapy.sniff Function
        '''
        scapy.sniff(prn=self.extract_packets, *self.args, **self.kwargs)
        return

    def save_packet(self, addr1, addr2, signal_strength, channel_flags, packet_length, pktType):
        '''
        Function to save packet to mongoDB
        '''
        # Need to have hardcoded router mac address to figure out which 
        # MAC address is the router and which is the victim
        if(addr1 == HARDCODED_ROUTER_MAC):
            router = addr1
            victim = addr2
        else:
            router = addr2
            victim = addr1

        router_info = self.lookup_mac(router)
        victim_info = self.lookup_mac(victim)

        attacks.insert_one({
            'router': router,
            'victim': victim,
            'routerInfo': router_info,
            'victimInfo': victim_info,
            'timestamp': int(time.time()),
            'signalStrength': signal_strength,
            'channelFlags': channel_flags,
            'packetLength': packet_length,
            'type': pktType
        })

        if str([router, victim]) in self.data.keys():
            self.data[str([router, victim])] = self.data[str([router, victim])]+1
        else:
            self.data[str([router, victim])] = 1

        return

    def lookup_mac(self, mac_address):
        '''
        Looks up mac address using https://macaddress.io
        '''
        print(f"Mac captured {mac_address}")

        macsend = "https://api.macvendors.com/" + mac_address.replace(":", "-")
        vendorsearch = get(macsend).text
        company_name = "N\A"
        if "Not Found" in vendorsearch:
            company_name = "N\A"
        elif "errors" in vendorsearch:
            company_name = "N\A"
        else:
            company_name = vendorsearch
        #mac_info = MacLookup().lookup(mac_address.replace(":", ":"))
        print(f"Vendor name {company_name}")

        return {
            'oui':'N\A',
            'is_private':False,
            'company_name':company_name,
            'company_address':'N\A',
            'country_code':'N\A'
        }


def main(*args, **kwargs):
    DeauthenticationDetector(*args, **kwargs)
    return

if __name__ == '__main__':
    if len(sys.argv) == 1:
        print(f"Started monitoring on {monitor_device}")
        print("Press CTRL+C to exit")
        main(iface=monitor_device)
    else:
        print(f" [ Error ] Please Provide Monitor Mode Interface Name Also \n\n\t:~# sudo {sys.argv[0]} mon0 ")

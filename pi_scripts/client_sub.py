#!/usr/bin/python3

import paho.mqtt.client as mqtt
from urllib.parse import urlparse
import sys
from picamera import PiCamera
import datetime
import subprocess
import user_details
import time

# Define event callbacks
def on_connect(client, userdata, flags, rc):
    print("Connection Result: " + str(rc))

def on_message(client, obj, msg):
    print("Topic:"+msg.topic + ",Payload:" + str(msg.payload))
    if user_details.isNotificationScheduled() == True:
        # fileLoc = f'/home/pi/theGoodMorningProject/images/snapshot.jpg'
        # currentTime = datetime.datetime.now().strftime("%H:%M:%S")
        # camera = PiCamera()
        # camera.start_preview()
        # camera.capture(fileLoc)
        # camera.close()
        # print(f'snapshot taken at {currentTime}')
        commands=user_details.getUserConfiguration()
        email=f"'{commands[2]}'"
        password=f"'{commands[2]}'"
        goodMorning=f"'Good {commands[0]} {commands[1]}'"
        playbackInformation=f"'{commands[2]}'"
        print('Try again buddy')
        subprocess.run("EMAIL=" + email + " PASSWORD=" + password + " /home/pi/git/thegoodmorningproject/pi_scripts/alexaRemote.sh -e speak:" + goodMorning, shell=True)
        subprocess.run("/home/pi/git/thegoodmorningproject/pi_scripts/alexaRemote.sh -e textcommand:" + playbackInformation, shell=True)
    

def on_subscribe(client, obj, mid, granted_qos):
    print("Subscribed,  QOS granted: "+ str(granted_qos))

def main():
    mqttc = mqtt.Client()
    mqttc.tls_set("./broker.emqx.io-ca.crt")

    # Assign event callbacks
    mqttc.on_message = on_message
    mqttc.on_connect = on_connect
    mqttc.on_subscribe = on_subscribe

    # parse mqtt url for connection details
    url_str = sys.argv[1]
    url = urlparse(url_str)
    base_topic = url.path[1:]

    # Connect
    if (url.username):
        mqttc.username_pw_set(url.username, url.password)
    print(url.hostname)
    print(url.port)
    mqttc.connect(url.hostname, url.port)

    # Start subscribe, with QoS
    mqttc.subscribe(base_topic+"/#")
    mqttc.loop_forever()

    # Continue the network loop, exit when an error occurs
    rc = 0
    while rc == 0:
        rc = mqttc.loop()

    print("rc: " + str(rc))

if __name__ == "__main__":
    main()
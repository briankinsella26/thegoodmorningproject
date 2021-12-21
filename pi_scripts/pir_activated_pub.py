#!/usr/bin/python3
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish
from urllib.parse import urlparse
from gpiozero import MotionSensor
import sys
import time

pir = MotionSensor(18)

# Define event callbacks
def on_connect(client, userdata, flags, rc):
    print("Connection Result: " + str(rc))

def on_publish(client, obj, mid):
    print("Message ID: " + str(mid))

mqttc = mqtt.Client()
mqttc.tls_set("./broker.emqx.io-ca.crt")

# Assign event callbacks
mqttc.on_connect = on_connect
mqttc.on_publish = on_publish

# parse mqtt url for connection details
url_str = sys.argv[1]
print(url_str)
url = urlparse(url_str)
base_topic = url.path[1:]

# Connect
if (url.username):
    mqttc.username_pw_set(url.username, url.password)

mqttc.connect(url.hostname, url.port)
mqttc.loop_start()

while True:
    state=1
    pir.wait_for_motion()
    mqttc.publish(base_topic+"/pir", state, 1)
    pir.wait_for_no_motion()
    time.sleep(5)

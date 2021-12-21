#!/bin/bash


python3 client_sub.py mqtt://broker.emqx.io:8883/briankinsella26/home &
python3 pir_activated_pub.py mqtt://broker.emqx.io:8883/briankinsella26/home
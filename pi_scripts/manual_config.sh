#!/bin/bash

python3 client_sub.py mqtt://broker.emqx.io:8883/briankinsella26/home &
python3 pir_activated_pub.py mqtt://broker.emqx.io:8883/briankinsella26/home

printf "****** Welcome to the good morning project ****** \n\nPlease enter your amazon email:\n"
read amazonEmail
printf "Please enter your amazon password:\n"
read amazonPassword
printf "Loggin in.."
grep -rl SET_EMAIL= ./mqtt | xargs sed -i "s/SET_EMAIL=.*/SET_EMAIL=${amazonEmail}/g"
grep -rl SET_PASSWORD= ./mqtt | xargs sed -i "s/SET_PASSWORD=.*/SET_PASSWORD=${amazonPassword}/g"
./mqtt/alexaRemote.sh -login

#store list of devices for the amazon account
./mqtt/alexaRemote.sh -a > deviceList.txt

#delete first line of deviceList
sed '1d' deviceList.txt > tmpfile; mv tmpfile deviceList.txt

#read lines of text file into an array - devices
while IFS=read -r line; do
    arr+=($line)
done < deviceList.txt

#Display array of device options and take user input
PS3="Please choose the device you wish to use for playback: "
select device in ${arr[@]}
do
    echo "Selected device: $device"
    break
done

#read lines of text file into an array
while IFS= read -r line; do
    arr+=($line)
done < playbackContent.txt

#Display array of device options and take user input
PS3="Please choose the device you wish to use for playback: "
select device in ${arr[@]}
do
    echo "Selected device: $device"
    playbackDevice = $device
    break
# done
./mqtt/alexaRemote.sh -d $device -e speak:'good morning brian, heres your outlook for the day'
sleep 3
./mqtt/alexaRemote.sh -d $device -e textcommand:'what are chances of rain today'
sleep 6
./mqtt/alexaRemote.sh -d $device -e textcommand:'will it be windy today'
sleep 10
./mqtt/alexaRemote.sh -d $device -e textcommand:'todays calendar'





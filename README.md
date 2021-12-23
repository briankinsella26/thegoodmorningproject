# thegoodmorningproject
Author: Brian Kinsella

Student number: 16728365

Web app: https://pure-ridge-08979.herokuapp.com

Youtube: 

Purpose:

The good morning project is a smart home integration consisting of a device, sensor and web interface. It is used to provide the user with specific information such as weather forecast or items on the user's calendar via Amazon Alexa upon entry to a room. The experience is such that the user should feel like the Alexa device has sensed they have entered the room,and provided them with relevant information depending on the user's configuration

Attributes:

A python publishing script runs on the raspberry pi that uses the MotionSensor from gpio module to handle movement detected by the attached PIR sensor. A message is sent to a mqtt broker and any devices can subscribe to this. For this purpose, the PI subscribes to it, and upon reciept of state in subscribed message, the program sends out a request to MongoDB cloud database (Atlas). 

The data returned from MongoDb to the subscriber script is configurations set by the user in the web application. The web application is deployed on Heroku here https://pure-ridge-08979.herokuapp.com/. A user can create a new account, or login to an existing account and add configurations for the good morning project service. These are the users amazon login details, when they want to schedule playback information, the name they would like to playback, and specific playback options. When these are saved, they are saved to MongoDb (Atlas). They can also be deleted from the DB from the web app.

When the data is returned to the subscriber script, there is some processing and logic performed to decide if this particular movement detected by the PIR sensor is within a schedule specified in the configuration. If it's not, or it is in a scheduled time, but playback has already been performed for this configuration today, it is ignored. Otherwise, a bash script is called passing in the configuration where the script logs into Alexa, and sends the commands. This configuration is then marked with a playback stamp, so it will not be repeated again that day.

Limitations/Bugs:
- There's no logic to handle where there are two schedules overlapping( they are played in order on each motion activation)
- The web app account setup uses a local database, whereas the configurations use MongoDB Atlas. So configurations are available to all logged in users, they are not tied to the user. (ran out of time)
- I wanted to integrate a photo capture on movement, and do facial recognition to identify the person to provide more personalised responses and would also help with overlapping schedules (ran out time)
- Amazon Alexa was particularly difficult to integrate with (i should have went with google), the cookies are a constant issue that I have yet to 100% resolve, causing login issues with the script (ran out of time)
- As the script was sending commands to Alexa, I had no call back or response to know when that specfic playback was finished so I could commence the next one (time.sleep was my best bet here)
- There were far more options available to playback that would have been much cooler than the few I included, such as routines, which can bundle commands, but this was based off a newer script with some bugs. I resolved a few, but used up too much of my day on it today and needed to tidy up other things.
- There's very little error handling included in the code.


Technologies:

Python
Javascript
Node.js
Handlebars
Shell scripting
 - bash
 - grep
 - jq
 - sed
Express.js
mqtt
mongodb
 - Atlas Cloud MongoDB
Heroku
Git
Raspberry Pi
PIR sensor
Amazon Alexa

Run web app on local environment:
- on command line enter: 'npm run start'
- in browser visit localhost:4000

To run or test sensor, messaging and Alexa scripts on Raspberry PI 
- SSH into device, run pub and sub python scripts in /git/thegoodmorningproject/pi_scripts
- python3 client_sub.py mqtt://broker.emqx.io:8883/briankinsella26/home
- python3 pir_activated_pub.py mqtt://broker.emqx.io:8883/briankinsella26/home

Sources:
https://loetzimmer.de/patches/alexa_remote_control.sh

Images:
https://www.photographytalk.com/landscape-photography/7860-a-step-by-step-guide-for-killer-sunrise-photos   

This application is a submission for educational purposes only

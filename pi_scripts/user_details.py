import json
import time
import datetime
import requests
import json

def getConfigurations():
    url = "https://data.mongodb-api.com/app/data-mtybs/endpoint/data/beta/action/findOne"
    payload = json.dumps({
        "collection": "configurations",
        "database": "themorningprojectdb",
        "dataSource": "Cluster0"
    })
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'kvErM5pzFQaISsF733UpenYeDTT7bWrJ85mAxhz956wb91U5igFxsJoDEDpyW6NJ'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)



def isNotificationScheduled():
    getConfigurations()
    with open("/home/pi/git/thegoodmorningproject/models/configuration-store.json") as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()
        
    currentDate = datetime.datetime.now().date()
    currentTime = datetime.datetime.now().strftime("%H:%M")
    configList = jsonObject['configurationCollection']
    for config in configList:
        if config["settings"][0]["playbackDateStamp"] != str(currentDate) and currentTime >= config["settings"][0]["starttime"] and currentTime <= config["settings"][0]["endtime"]:
            return True

def getUserCommands():
        with open("/home/pi/git/thegoodmorningproject/models/configuration-store.json") as jsonFile:
            jsonObject = json.load(jsonFile)
            jsonFile.close()
            
            currentDate = datetime.datetime.now().date()
            currentTime = datetime.datetime.now().strftime("%H:%M")
            configList = jsonObject['configurationCollection']
            for config in configList:
                if config["settings"][0]["playbackDateStamp"] != currentDate and currentTime >= config["settings"][0]["starttime"] and currentTime <= config["settings"][0]["endtime"]:
                    name = config["settings"][0]["name"]
                    playbackInformation = config["settings"][0]["info"]
                    #add date stamp to config to avoid repeating notifications
                    config["settings"][0]["playbackDateStamp"] = str(currentDate)
                    #set time of day descriptor    
                    if currentTime >= '00:00'and currentTime < '12:00':
                        dayTimeDescriptor = 'morning'
                    elif currentTime >= '12:00' and currentTime <= '16:00':
                        dayTimeDescriptor = 'afternoon'
                    else: 
                        dayTimeDescriptor = 'night'
                    with open("/home/pi/git/thegoodmorningproject/models/configuration-store.json", "w") as jsonFile:
                        json.dump(jsonObject, jsonFile)
                    return [dayTimeDescriptor, name, playbackInformation]


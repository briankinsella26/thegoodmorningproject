"use strict";

const logger = require("../utils/logger");
const configurationStore = require("../models/configuration-store");
const uuid = require("uuid");
var exec = require('child_process').exec, child;

const configuration = {
  index(request, response) {
    const configurationId = request.params.id;
    const configuration = configurationStore.getConfiguration(configurationId);
    const viewData = {
      title: "Configuration",
      configuration: configuration,
    };
    response.render("configuration", viewData);
  },
  

  login(request, reponse){
    const user = request.body;
    const myShellScript = exec('sh ./utils/alexaRemote.sh -login' );
    myShellScript.stdout.on('data', (data)=>{
    console.log(data); 
    });
      myShellScript.stderr.on('data', (data)=>{
          console.error(data);
    });
  },
  

  getDeviceList(request, response){
    const myShellScript = exec('sh ./utils/alexaRemote.sh -a > deviceList.txt' );
    myShellScript.stdout.on('data', (data)=>{
    console.log(data); 
    });
      myShellScript.stderr.on('data', (data)=>{
          console.error(data);
    });
  },

  addSetting(request, response) {
    const configurationId = request.params.id;
    const newSetting = {
      date: new Date().toLocaleString(),
      id: uuid.v1(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    logger.debug("New reading = ", newSetting);
    configurationStore.addSetting(configurationId, newSetting);
    response.redirect("/configuration/" + configurationId);
  }
};

module.exports = configuration;

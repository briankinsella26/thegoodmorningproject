"use strict";

const logger = require("../utils/logger");
const configurationStore = require("../models/configuration-store").default;
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
    const configurationId = request.params.id;
    const executeLogin = exec('sh ./utils/alexaRemote.sh -login' );
    executeLogin.stdout.on('data', (data)=>{
    });
    executeLogin.stderr.on('data', (data)=>{
      console.error(data);
    });
    const getDeviceList = exec('sh ./utils/alexaRemote.sh -a | tee deviceList.txt' );
    getDeviceList.stdout.on('data', (data)=>{
      configurationStore.addConfigDeviceList(configurationId, data)
    });
    getDeviceList.stderr.on('data', (data)=>{
      console.error(data);
    });
  },

  addSetting(request, response) {
    console.log(request.body);
    const configurationId = request.params.id;
    const newSetting = {
      // device: request.params.device,
      name: request.body.name,
      starttime: request.body.starttime,
      endtime: request.body.endtime,
      info: request.body.info
    };
    logger.debug("New setting = ", newSetting);
    configurationStore.addConfigSetting(configurationId, newSetting);
    response.redirect("/configuration/" + configurationId);
  }
};

module.exports = configuration;

"use strict";

const logger = require("../utils/logger");
const configurationStore = require("../models/configuration-store");
const uuid = require("uuid");
var exec = require('child_process').exec, child;

const configuration = {
  async index(request, response) {
    const configurationId = request.params.id;
    const configuration = await configurationStore.getConfiguration(configurationId);
    const viewData = {
      title: "Configuration",
      configuration: configuration,
    };
    response.render("configuration", viewData);
  },

  async addSetting(request, response) {
    console.log("request body - add setting");
    console.log(request.body);
    const configurationId = request.params.id;
    const newSetting = {
      name: request.body.name,
      amemail: request.body.amemail,
      ampassword: request.body.ampassword,
      starttime: request.body.starttime,
      endtime: request.body.endtime,
      info: request.body.info
    };
    logger.debug("New setting = ", newSetting);
    await configurationStore.addConfigSetting(configurationId, newSetting);
    response.redirect("/dashboard");
  }
};

module.exports = configuration;

"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const configurationStore = require("../models/configuration-store");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Configuration Dashboard",
      configurations: configurationStore.getUserConfigurations(loggedInUser.id),
      user: loggedInUser,
    };
    response.render("dashboard", viewData);
  },

  deleteConfiguration(request, response) {
    const configurationId = request.params.id;
    logger.debug(`Deleting Station ${configurationId}`);
    configurationStore.removeConfiguration(configurationId);
    response.redirect("/dashboard");
  },

  addConfiguration(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newConfiguration = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      settings: [],
    };
    logger.debug("Creating a new Configuration", newConfiguration);
    configurationStore.addConfiguration(newConfiguration);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;

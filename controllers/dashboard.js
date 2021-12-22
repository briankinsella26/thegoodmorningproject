const configurationStore = require("../models/configuration-store")
const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const uuid = require("uuid");

const dashboard = {
  async index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    configurations = await configurationStore.getUserConfigurations(loggedInUser.id);
    const viewData = {
      title: "Configuration Dashboard",
      configurations: configurations,
      user: loggedInUser,
    };
    response.render("dashboard", viewData);
  },

  async deleteConfiguration(request, response) {
    const configurationId = request.params.id;
    logger.debug(`Deleting Station ${configurationId}`);
    await configurationStore.removeConfiguration(configurationId);
    response.redirect("/dashboard");
  },

  async addConfiguration(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newConfiguration = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      settings: [],
      devices: [],
    };
    logger.debug("Creating a new Configuration", newConfiguration);
    await configurationStore.addConfiguration(newConfiguration);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;

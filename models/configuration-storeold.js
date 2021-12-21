"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const configurationStore = {
  store: new JsonStore("./models/configuration-store.json", { configurationCollection: [] }),
  collection: "configurationCollection",

  getAllConfigurations() {
    return this.store.findAll(this.collection);
  },

  getConfiguration(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserConfigurations(userid) {
    let configurations = this.store.findBy(this.collection, { userid: userid });
    return _.sortBy(configurations, (configuration) => configuration.name.toLowerCase());
  },

  addConfiguration(configuration) {
    this.store.add(this.collection, configuration);
    this.store.save();
  },

  removeConfiguration(id) {
    const configuration = this.getConfiguration(id);
    this.store.remove(this.collection, configuration);
    this.store.save();
  },

  removeAllConfigurations() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addConfigSetting(id, setting) {
    console.log(setting);
    const configuration = this.getConfiguration(id);
    configuration.settings.push(setting);
    this.store.save();
  },
  addConfigDeviceList(id, deviceList) {
    const configuration = this.getConfiguration(id);
    const deviceArray = deviceList.split("\n")
    configuration.devices.push(deviceArray);
    this.store.save();
  },

  removeConfigSetting(id, settingId) {
    const configuration = this.getConfiguration(id);
    const settings = configuration.settings;
    _.remove(settings, { id: settingId });
    this.store.save();
  },
};

module.exports = configurationStore;

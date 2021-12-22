"use strict";

const logger = require("../utils/logger");
const accounts = require("./accounts.js");

const home = {
  index(request, response) {
    logger.info("home page rendering");
    let user = null;

    if (request.cookies.thegoodmorningproject) {
      user = accounts.getCurrentUser(request);
    }
    
    const viewData = {
      title: "the good morning project",
      user: user,
    };
    response.render("home", viewData);
  },
};

module.exports = home;

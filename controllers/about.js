"use strict";

const logger = require("../utils/logger");

const about = {
  index(request, response) {
    logger.info("about page rendering");
    const viewData = {
      title: "About the good morning project"
    }
    response.render("about", viewData);
  }
}

module.exports = about;
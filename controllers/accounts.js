"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("thegoodmorningproject", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Signup to the Service",
    };
    response.render("signup", viewData);
  },

  profile(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "My Profile",
      user: loggedInUser,
    };
    response.render("profile", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.cookie("thegoodmorningproject", user.email);
    response.redirect("/dashboard");
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user && request.body.password == user.password) {
      response.cookie("thegoodmorningproject", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.thegoodmorningproject;
    return userstore.getUserByEmail(userEmail);
  },

  editProfile(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    logger.info("Editing user: " + request.body.email);
    user.firstName = request.body.firstName;
    user.lastName = request.body.lastName;
    if (request.body.password.length > 0) {
      user.password = request.body.password;
    }
    user.email = request.body.email;
    userstore.updateUser(user);
    response.redirect("/dashboard");
  },
};

module.exports = accounts;

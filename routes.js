"use strict";

const express = require("express");
const router = express.Router();

const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const home = require("./controllers/home.js");
const configuration = require("./controllers/configuration.js");

router.get("/", home.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/profile", accounts.profile);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);
router.post("/editprofile", accounts.editProfile);

router.get("/dashboard", dashboard.index);
router.get("/dashboard/deleteconfiguration/:id", dashboard.deleteConfiguration);
router.post("/dashboard/addconfiguration", dashboard.addConfiguration);

router.get("/about", about.index);
router.get("/configuration/:id", configuration.index);
router.post("/configuration/amazonlogin/:id", configuration.login);
router.post("/configuration/addsetting/:id", configuration.addSetting);

module.exports = router;

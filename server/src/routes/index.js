const express = require("express");
const routeUser = require("./routeUser");
const routeGroup = require("./routeGroup");
const routeChannel = require("./routeChannel");

const routes = express.Router();

routes.use("/user", routeUser);
routes.use("/group", routeGroup);
routes.use("/channel", routeChannel);

module.exports = routes;

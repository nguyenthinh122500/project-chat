const express = require('express');
const { getListGourp, getMemberGourp, getMessGroup } = require('../controllers/group');
const routeGroup = express.Router();


routeGroup.get('/getlistgroup/:id',getListGourp)
routeGroup.get('/getmembergroup/:id',getMemberGourp)
routeGroup.get('/getmessgroup/:id',getMessGroup)




module.exports = routeGroup
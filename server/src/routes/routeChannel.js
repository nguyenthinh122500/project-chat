const express = require('express');
const { getListChannel, getMessChannel, getChannelByID, getMemberChannel } = require('../controllers/channel');
const routeChannel = express.Router();


routeChannel.get('/getlistchannel/:id',getListChannel)
routeChannel.get('/getmessagechannel/:id',getMessChannel)
routeChannel.get('/getchannelid/:id',getChannelByID)
routeChannel.get('/getchannelmember/:id',getMemberChannel)





module.exports = routeChannel
const express = require('express');
const {  getListUser, getMessage, Login, getUserMessages, chargeMonthlyFee, getUserByID } = require('../controllers/user');
const routeUser = express.Router();


routeUser.get('/getlistuser',getListUser)
routeUser.get('/getmessage/:SenderID/:ReceiverID',getMessage)
routeUser.post('/login',Login)
routeUser.post('/getusermessage',getUserMessages)
routeUser.post('/changemonet',chargeMonthlyFee)
routeUser.get('/getuserid/:UserID',getUserByID)



module.exports = routeUser
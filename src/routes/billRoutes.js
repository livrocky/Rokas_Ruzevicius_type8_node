const express = require('express');
const { getBillByGroupId, addNewBill } = require('../controller/billController');
const { validateToken } = require('../middleware');

const billRoutes = express.Router();

billRoutes.get('/bills/:group_id', validateToken, getBillByGroupId);
billRoutes.post('/bills', validateToken, addNewBill);

module.exports = billRoutes;

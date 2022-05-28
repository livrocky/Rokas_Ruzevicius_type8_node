const express = require('express');
const { getUserGroups } = require('../controller/groupController');

const groupRoutes = express.Router();

groupRoutes.get('/groups', getUserGroups);

module.exports = groupRoutes;

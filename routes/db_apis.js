const {Router} = require('express');
const route_data = Router();
//const multer = require('multer')
const api = require('../controller/routes_impliments/push_data')

route_data.post('/push_data',api.pushData_api);

module.exports = route_data; 
 
 
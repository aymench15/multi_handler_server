const {Router} = require('express');
const route_data = Router();
//const multer = require('multer')
const api = require('../controller/routes_impliments/push_data')

route_data.post('/push_data',api.pushData_api);
route_data.post('/autocomplete',api.auto_complete)
route_data.get('/getalldata',api.get_all_data)

module.exports = route_data; 
 
 
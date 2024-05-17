const {Router} = require('express');
const route_data = Router();

//const multer = require('multer')
const api = require('../controller/routes_impliments/push_data')
const mob_app_api = require('../controller/routes_impliments/mob_app_api')
route_data.post('/push_data',api.pushData_api);
route_data.post('/autocomplete',api.auto_complete)
route_data.get('/getalldata',api.get_all_data)
route_data.post('/getforecastingdata',api.getforecastingdata)
route_data.post('/push_model',api.push_deployed_models)
route_data.get('/getmodeldata',api.get_model_data)
route_data.get('/predict',api.get_data_for_prediction)
route_data.post('/login',api.post_login)
route_data.get('/logout',api.logout)
route_data.get('/mobapp_api/id=:id',mob_app_api.verify_app_login)
route_data.get('/mobapp_api_weather/id=:id',mob_app_api.get_weather_data)


module.exports = route_data; 
 
 
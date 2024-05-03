const {Router} = require('express');
const route = Router();
//const multer = require('multer')
const api = require('../controller/routes_impliments/renders')
const authVer = require('../protectRoutes/protect_verify');

route.get('/',authVer,api.home);
route.get('/graphs',authVer,api.graphs);
route.get('/actions',authVer,api.actions);
route.get('/logs',authVer,api.logs);
route.get('/ai_models',authVer,api.ai_models);
route.get('/details',authVer,api.details);
route.get('/about',authVer,api.about);
route.get('/moisture',authVer,api.moisture);
route.get('/temperature',authVer,api.temperature);
route.get('/humidity',authVer,api.humidity);
route.get('/windspeed',authVer,api.windspeed);
route.get('/login',api.login);

//route.get('/',api.home);
//route.post('/search',search_controller.postSearch);
//route.get('/send',process_controller.getSend);
//route.post('/send', multer().single('file'),process_controller.postSend);
module.exports = route;    
const {Router} = require('express');
const route = Router();
//const multer = require('multer')
const api = require('../controller/routes_impliments/renders')


route.get('/',api.home);
route.get('/graphs',api.graphs);
route.get('/actions',api.actions);
route.get('/logs',api.logs);
route.get('/ai_models',api.ai_models);
route.get('/details',api.details);
route.get('/about',api.about);
route.get('/moisture',api.moisture);
route.get('/temperature',api.temperature);
route.get('/humidity',api.humidity);
route.get('/windspeed',api.windspeed);
route.get('/login',api.login);
//route.get('/',api.home);
//route.post('/search',search_controller.postSearch);
//route.get('/send',process_controller.getSend);
//route.post('/send', multer().single('file'),process_controller.postSend);
module.exports = route;    
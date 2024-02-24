const {Router} = require('express');
const route = Router();
//const multer = require('multer')
const api = require('../controller/routes_impliments/apis')


route.get('/',api.home);
//route.post('/search',search_controller.postSearch);
//route.get('/send',process_controller.getSend);
//route.post('/send', multer().single('file'),process_controller.postSend);
module.exports = route;    
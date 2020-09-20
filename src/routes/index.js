const multer = require('multer');
const multerConfig = require('../config/multer');

const express = require('express');
const routes = express.Router();

const LoginValidator = require('../app/validator/LoginValidator');

const UploadController = require('../app/controllers/UploadController');
const UploadValidator = require('../app/validator/UploadValidator');

const DownloadController = require('../app/controllers/DownloadController');

const SearchingController = require('../app/controllers/SearchingController');

routes.get('/lang', LoginValidator.isLogged, (req, res) => {
    const { lang } = req.query;
    
    if(['en', 'es', 'pt'].includes(lang)) {
        req.session.user.lang = lang;
    }
    
    return res.redirect('/');
})

routes.get('/', LoginValidator.isLogged, UploadController.index);
routes.post('/', LoginValidator.isLogged, multer(multerConfig).single('file'), UploadValidator.post, UploadController.post);

routes.get('/results/:hash', LoginValidator.isLogged, DownloadController.results);
routes.get('/results/:hash/state', LoginValidator.isLogged, DownloadController.state);
routes.get('/results/:hash/download', LoginValidator.isLogged, DownloadController.download);

routes.get('/search', LoginValidator.isLogged, SearchingController.search);

module.exports = routes;
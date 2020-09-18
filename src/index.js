const express = require('express');
const nunjucks  = require('nunjucks');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'njk');

nunjucks.configure('src/app/views', {
    express: app,
    autoescape: false,
    noCache: true
});

app.get('/', (req, res) => {
    const langs = require('./lib/lang');

    return res.render('layout', { lang: langs['en'] });
});

const multer = require('multer');
const multerConfig = require('./config/multer');
app.post('/posts', multer(multerConfig).single('file'), (req, res) => {
    console.log(req.file);
});

app.listen(5000, () => {
    console.log('Server is running');
});
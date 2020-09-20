const express = require('express');
const nunjucks  = require('nunjucks');
const flash = require('express-flash');

const routes = require('./routes');
const session = require('./config/session');

const app = express();

app.use(session);


app.use((req, res, next) => {
    res.locals.session = req.session;
    
    next();
})

app.use(flash());

app.use(routes);

app.use(express.static('public'));
app.set('view engine', 'njk');

nunjucks.configure('src/app/views', {
    express: app,
    autoescape: false,
    noCache: true
});

app.listen((process.env.PORT || 5000), () => {
    console.log('Server is running');
});
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

module.exports = session({
    secret: 'bUSAGu213ygÇ;/d312JFL~ç',
    store: new SQLiteStore(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 120 * 24 * 60 * 60 * 1000
    }
});
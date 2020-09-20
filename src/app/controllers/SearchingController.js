const lang = require('../../lib/lang');

const SearchingController = require('../services/SearchingService');

module.exports = {
    async search(req, res) {
        const { NIF } = req.query;

        const response = await SearchingController.handle({
            NIF
        });

        if(response['Razón Social'].includes('error')) {
            req.flash('error', lang[req.session.user.lang].errors.nif_not_found);

            return res.redirect('/');
        } else {
            return res.render('search/index', { NIF: response, lang: lang[req.session.user.lang] });
        }
    }
}
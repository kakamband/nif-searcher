const langs = require('../../lib/lang');

const WorkerService = require('../services/WorkerService');

module.exports = {    
    results(req, res) {
        const { hash } = req.params;

        const found = WorkerService.state(hash);

        if(found) {
            if(item.position > 1) found.status = langs[req.session.user.lang].general.waiting_queue;
            else if(found.finished) found.status = langs[req.session.user.lang].general.finished;
            else found.status = langs[req.session.user.lang].general.started;
            
            found.total = found.array.length;

            if(!found.finished) req.flash('success', langs[req.session.user.lang].general.wait_until_complete);

            return res.render('results/index', { found, hash, lang: langs[req.session.user.lang] });
        } else {
            req.flash('error', langs[req.session.user.lang].errors.invalid_hash);

            return res.redirect('/');
        }

    },
    state(req, res) {
        const { hash } = req.params;

        const found = WorkerService.state(hash);

        if(found) {
            if(found.position > 1) found.status = langs[req.session.user.lang].general.waiting_queue;
            else if(found.finished) found.status = langs[req.session.user.lang].general.finished;
            else found.status = langs[req.session.user.lang].general.started;

            return res.send({
                status: 'success',
                message: langs[req.session.user.lang].success.found_hash,
                found,
            })
        } else {
            return res.send({
                status: 'error',
                message: langs[req.session.user.lang].errors.not_found_hash
            });
        }
    },
    download(req, res) {
        const { hash } = req.params;

        const found = WorkerService.state(hash);

        if(found) {
            return res.download(found.path, "NIFs.xlsx");
        }
        else {
            req.flash('error', langs[req.session.user.lang].errors.file_not_found);

            return res.redirect('/');
        }
    }
}
const langs = require('../../lib/lang');

const Worker = require('../services/WorkerService');

module.exports = {
    index(req, res) {
        const recent = Worker.find(req.session.user.userHash);

        for(item of recent) {
            if(item.position > 1) item.status = langs[req.session.user.lang].general.waiting_queue;
            else if(item.finished) item.status = langs[req.session.user.lang].general.finished;
            else item.status = langs[req.session.user.lang].general.started;
        }

        return res.render('main/index', { lang: langs[req.session.user.lang], recent });
    },
    async post(req, res) {
        const fileParts = req.file.filename.split('.');

        const hash = fileParts[0];

        const object = {
            userHash: req.session.user.userHash,
            hash,
            array: req.body
        }

        Worker.add(object);

        Worker.work();

        return res.send({
            status: 'success',
            message: langs[req.session.user.lang].success.uploaded_click_here,
            hash
        });
    },
}
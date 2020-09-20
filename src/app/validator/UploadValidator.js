const ExcelReader = require('../../lib/ExcelReader');

const langs = require('../../lib/lang');

const validColumns = ['NIF'];

const validateColumns = (data) => {
    const keys = Object.keys(data);
    
    for(key of keys) {
        if(!validColumns.includes(key)) {
            return false;
        }
    }

    return true;
}

module.exports = {
    async post(req, res, next) {
        if(!req.file.path) {
            return res.send({
                status: 'error',
                message: langs['en'].errors.no_files,
            });
        }

        const data = await ExcelReader.handle(req.file.path);

        if(!validateColumns(data[0])) return res.send({
            status: 'error',
            message: langs['en'].errors.invalid_template
        });

        req.body = data;

        next();
    }
}
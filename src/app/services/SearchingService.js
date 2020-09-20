const Axios = require('axios');
const Cheerio = require('cheerio');

const formatter = require('../../lib/Formatter');

const search = async (item) => {
    const response = await Axios.get('http://www.infocif.es/general/empresas-informacion-listado-empresas.asp?Buscar='+item.NIF, 
            { responseType: 'arraybuffer', responseEncoding: 'binary' });

    const html = response.data.toString('latin1');
    const $ = Cheerio.load(html);

    return {
        "NIF": $('#fe-informacion-izq:nth-child(1) > h2').text() || item.NIF,
        "Razón Social": $('h1.title').text(),
        "Domicilio": $('#fe-informacion-izq:nth-child(1) > p:nth-of-type(2)').text().replace(/(\r\n|\n|\r)/gm,""),
        "Teléfono": $('#fe-informacion-izq:nth-child(1) > p:nth-of-type(3)').text().replace(/(\r\n|\n|\r)/gm,""),
        "Registro": $('#fe-informacion-izq:nth-child(1) > p:nth-of-type(4)').text().replace(/(\r\n|\n|\r)/gm,""),
        "Website": $('#fe-informacion-izq:nth-child(1) > p:nth-of-type(5)').text().replace(/(\r\n|\n|\r)/gm,""),
    }
}

const handle = async (item) => {
    let found = await search(item);
    
    found = formatter.format(found);

    return found;
};

module.exports = {
    handle
}
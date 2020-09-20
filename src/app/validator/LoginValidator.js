const { default: Axios } = require('axios');
const crypto = require('crypto');

const default_languages = [
    { code: 'AG', lang: 'en' }, {  code: 'AI', lang: 'en' }, {  code: 'AQ', lang: 'en' }, {  code: 'AS', lang: 'en' }, {  code: 'AU', lang: 'en' }, {  code: 'BB', lang: 'en' }, {  code: 'BM', lang: 'en' }, {  code: 'BS', lang: 'en' }, {  code: 'BW', lang: 'en' }, {  code: 'BZ', lang: 'en' }, {  code: 'CA', lang: 'en' }, {  code: 'CC', lang: 'en' }, {  code: 'CK', lang: 'en' }, {  code: 'CM', lang: 'en' }, {  code: 'CW', lang: 'en' }, {  code: 'CX', lang: 'en' }, {  code: 'DM', lang: 'en' }, {  code: 'ER', lang: 'en' }, {  code: 'FJ', lang: 'en' }, {  code: 'FK', lang: 'en' }, {  code: 'FM', lang: 'en' }, {  code: 'GB', lang: 'en' }, {  code: 'GD', lang: 'en' }, {  code: 'GG', lang: 'en' }, {  code: 'GH', lang: 'en' }, {  code: 'GI', lang: 'en' }, {  code: 'GM', lang: 'en' }, {  code: 'GS', lang: 'en' }, {  code: 'GU', lang: 'en' }, {  code: 'GY', lang: 'en' }, {  code: 'HK', lang: 'en' }, {  code: 'HM', lang: 'en' }, {  code: 'IE', lang: 'en' }, {  code: 'IM', lang: 'en' }, {  code: 'IN', lang: 'en' }, {  code: 'IO', lang: 'en' }, {  code: 'JE', lang: 'en' }, {  code: 'JM', lang: 'en' }, {  code: 'KE', lang: 'en' }, {  code: 'KI', lang: 'en' }, {  code: 'KN', lang: 'en' }, {  code: 'KR', lang: 'en' }, {  code: 'KY', lang: 'en' }, {  code: 'LC', lang: 'en' }, {  code: 'LR', lang: 'en' }, {  code: 'LS', lang: 'en' }, {  code: 'MH', lang: 'en' }, {  code: 'MP', lang: 'en' }, {  code: 'MS', lang: 'en' }, {  code: 'MT', lang: 'en' }, {  code: 'MU', lang: 'en' }, {  code: 'MW', lang: 'en' }, {  code: 'NA', lang: 'en' }, {  code: 'NF', lang: 'en' }, {  code: 'NG', lang: 'en' }, {  code: 'NR', lang: 'en' }, {  code: 'NU', lang: 'en' }, {  code: 'NZ', lang: 'en' }, {  code: 'PG', lang: 'en' }, {  code: 'PH', lang: 'en' }, {  code: 'PK', lang: 'en' }, {  code: 'PN', lang: 'en' }, {  code: 'PR', lang: 'en' }, {  code: 'PW', lang: 'en' }, {  code: 'RW', lang: 'en' }, {  code: 'SB', lang: 'en' }, {  code: 'SC', lang: 'en' }, {  code: 'SD', lang: 'en' }, {  code: 'SG', lang: 'en' }, {  code: 'SH', lang: 'en' }, {  code: 'SL', lang: 'en' }, {  code: 'SS', lang: 'en' }, {  code: 'SX', lang: 'en' }, {  code: 'SZ', lang: 'en' }, {  code: 'TC', lang: 'en' }, {  code: 'TK', lang: 'en' }, {  code: 'TO', lang: 'en' }, {  code: 'TT', lang: 'en' }, {  code: 'TV', lang: 'en' }, {  code: 'TZ', lang: 'en' }, {  code: 'UG', lang: 'en' }, {  code: 'UM', lang: 'en' }, {  code: 'US', lang: 'en' }, {  code: 'VC', lang: 'en' }, {  code: 'VG', lang: 'en' }, {  code: 'VI', lang: 'en' }, {  code: 'VU', lang: 'en' }, {  code: 'WS', lang: 'en' }, {  code: 'ZA', lang: 'en' }, {  code: 'ZM', lang: 'en' }, {  code: 'ZW', lang: 'en' },
    { code: 'AR', lang: 'es' }, {  code: 'BO', lang: 'es' }, {  code: 'CL', lang: 'es' }, {  code: 'CO', lang: 'es' }, {  code: 'CR', lang: 'es' }, {  code: 'CU', lang: 'es' }, {  code: 'DO', lang: 'es' }, {  code: 'EC', lang: 'es' }, {  code: 'EH', lang: 'es' }, {  code: 'ES', lang: 'es' }, {  code: 'GQ', lang: 'es' }, {  code: 'GT', lang: 'es' }, {  code: 'HN', lang: 'es' }, {  code: 'MX', lang: 'es' }, {  code: 'NI', lang: 'es' }, {  code: 'PA', lang: 'es' }, {  code: 'PE', lang: 'es' }, {  code: 'PY', lang: 'es' }, {  code: 'SV', lang: 'es' }, {  code: 'UY', lang: 'es' }, {  code: 'VE', lang: 'es' },
    { code: 'AO', lang: 'pt' }, {  code: 'BR', lang: 'pt' }, {  code: 'CV', lang: 'pt' }, {  code: 'GW', lang: 'pt' }, {  code: 'MO', lang: 'pt' }, {  code: 'MZ', lang: 'pt' }, {  code: 'PT', lang: 'pt' }, {  code: 'ST', lang: 'pt' }, {  code: 'TL', lang: 'pt' }
]

module.exports = {
    async isLogged(req, res, next) {
        
        if(!req.session.user) {
            const user = {
                userHash: crypto.randomBytes(16).toString('hex'),
            }

            try {
                response = await Axios.get(`http://ipinfo.io/?token=508a9f6c05c8d3`);

                if(response.data) {
                    const foundLanguage = default_languages.find(item => item.code == response.data.country);

                    if(foundLanguage) {
                        user.lang = foundLanguage.lang;
                    } else {
                        user.lang = 'en';
                    }
                }
            } catch(e) {
                user.lang = 'en';
            }

            req.session.user = user;

        }
        
        next();
    }
}
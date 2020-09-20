const formatAddress = (address) => {
    if(!address.full_address) {
        address = {
            'Domicilio': '',
            'Calle': '',
            'Código Postal': '',
            'Ciudade': ''
        }
    } else {
        address.full_address = address.full_address.replace(/  +/g, ' ');
        
        const addressParts = address.full_address.split(/\s\s+/g);
        
        address = {
            'Domicilio': trimString(address.full_address),
            'Calle': trimString(addressParts[0]),
            'Código Postal': trimString(addressParts[1]),
            'Ciudade': trimString(addressParts[2].split(/\(([^)]+)\)/)[1]),
            'Provincia': trimString(addressParts[2].split('- ')[2]),
        }
    }

    return address;
}

const validate = (item) => {
    if(!item['Razón Social'] && !item['Registro'] && !item['Razón Social']) return {
            ...item,
            'Razón Social': 'Ha ocurrido un error inesperado',
            Domicilio: 'Ha ocurrido un error inesperado',
            'Teléfono': 'Ha ocurrido un error inesperado',
            Registro: 'Ha ocurrido un error inesperado',
            Website: 'Ha ocurrido un error inesperado',
            Domicilio: 'Ha ocurrido un error inesperado',
            Calle: 'Ha ocurrido un error inesperado',
            'Código Postal': 'Ha ocurrido un error inesperado',
            Ciudade: 'Ha ocurrido un error inesperado',
            Provincia: 'Ha ocurrido un error inesperado',
        }

    return item;
}

const trimString = (string) => {
    if(string && isNaN(string)) return string.trim();
    else if (string && !isNaN(string)) return Number(string);

    return '';
}

const format = (item) => {
    let address;

    try {
        address = formatAddress({
            full_address: item.Domicilio
        });
    } catch(e) {
        address = {
            'Domicilio': '',
            'Calle': '',
            'Barrio': '',
            'Código Postal': '',
            'Ciudade': ''
        };
    }

    item = {
        NIF: trimString(item.NIF),
        'Razón Social': trimString(item['Razón Social']),
        ...address,
        'Teléfono': trimString(item['Teléfono']),
        Registro: trimString(item.Registro),
        Website: trimString(item.Website)
    }
    
    item = validate(item);

    return item;
}

module.exports = {
    format
}
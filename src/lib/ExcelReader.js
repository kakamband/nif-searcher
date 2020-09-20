const ExcelJS = require('exceljs');

const readExcel = (location) => {
    const workbook = new ExcelJS.Workbook();

    return workbook.xlsx.readFile(location);
}

const readWorksheet = (worksheet = (new ExcelJS.Workbook()).getWorksheet(1)) => {
    const totalRows = worksheet.rowCount;

    const data = [];
    
    for(c = 2; c <= totalRows; c++) {
        data.push({
            [worksheet.getRow(1).getCell(1).value]: worksheet.getRow(c).getCell(1).value,
        });
    }

    return data;
}

const handle = async (location) => {
    const workbook = await readExcel(location);

    const worksheet = workbook.getWorksheet(1);
    
    return readWorksheet(worksheet);
}

module.exports = {
    handle
}
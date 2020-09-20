const ExcelJS = require('exceljs');

function setWorkbookProperties(workbook = new ExcelJS.Workbook()) {
    workbook.creator = 'ledoctah';
    workbook.lastModifiedBy = 'ledoctah';
    workbook.created = new Date();
}

function addWorksheet(workbook = new ExcelJS.Workbook(), worksheetName) {
    workbook.addWorksheet(worksheetName);
}

function applyHeaders(workbook = new ExcelJS.Workbook(), data, worksheetName) {
    const keys = Object.keys(data[0]);

    const columns = [];

    for(let c = 0; c < keys.length; c++) {
        columns.push({
            header: keys[c],
            key: keys[c],
            width: 12
        });
    }

    workbook.getWorksheet(worksheetName).columns = columns;
}

function populateData(data, worksheetName, workbook = new ExcelJS.Workbook()) {

    const worksheet = workbook.getWorksheet(worksheetName);

    worksheet.addRows(data);
}

function setColumnsSize(worksheetName, workbook = new ExcelJS.Workbook()) {
    const worksheet = workbook.getWorksheet(worksheetName);
    const columns = worksheet.columns;

    for(let column of columns) {
        let biggestLength = 0;

        for(let value of column.values) {

            if(value){
                const length = value.length;

                if(length > biggestLength && length <= 25) {
                    biggestLength = length;
                } else if (length > 25) {
                    biggestLength = 25;
                }
            }

        }

        column.width = biggestLength < 18 ? 18 : biggestLength;
    }

}

function applyHeaderStyle(data, worksheetName, style, workbook = new ExcelJS.Workbook()) {
    const worksheet = workbook.getWorksheet(worksheetName);

    if(!style) style = {
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'FFB4C6E7'}
        },
        font: {
            bold: true
        },
        alignment: { 
            horizontal: "center"
        }
    }

    for(let c = 1; c <= Object.keys(data[0]).length; c++) {
        worksheet.getRow(1).getCell(c).style = style;
    }
}

function applyBodyStyle(data, worksheetName, style, workbook = new ExcelJS.Workbook()) {
    const worksheet = workbook.getWorksheet(worksheetName);

    for(let c = 1; c <= Object.keys(data[0]).length; c++) {
        const column = worksheet.getColumn(c);

        column.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
            if(rowNumber != 1) cell.style = style;
        });
    }
}

function generateWorkbook(data, worksheetName, hash, style = {}, workbook = new ExcelJS.Workbook()) {
    if(data.length){
        setWorkbookProperties(workbook);
        addWorksheet(workbook, worksheetName);
        applyHeaders(workbook, data, worksheetName);
        populateData(data, worksheetName, workbook);
        setColumnsSize(worksheetName, workbook);
        applyHeaderStyle(data, worksheetName, style.header, workbook);

        if(style.body) {
            applyBodyStyle(data, worksheetName, style.body, workbook);
        }
    }

    return workbook.xlsx.writeFile(`./tmp/downloads/${hash}.xlsx`);
}

module.exports = {
    generateWorkbook
};
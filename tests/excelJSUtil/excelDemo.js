const ExcelJs = require('exceljs');

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();
    // https://rahulshettyacademy.com/upload-download-test/index.html
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);
    // replace cell value in excel
    const cell = worksheet.getCell(output.row + change.rowChange, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile("/Users/jigarsony/Downloads/excelDownloadTest.xlsx");
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    //get all or specific text
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            //console.log(cell.value) //- print all ExcelSheet
            if (cell.value === searchText) {
                // console.log(rowNumber);
                // console.log(colNumber);
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}
writeExcelTest("Mango", 350, { rowChange: 0, colChange: 2 }, "/Users/jigarsony/Downloads/excelDownloadTest.xlsx");
// how to run this - locate till this folder - node <fileName>
// update mango proce to 250
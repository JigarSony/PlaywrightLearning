const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

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
// how to run this - locate till this folder - node <fileName>
// update mango proce to 250

test('DownloadUpdateUploadAndValidateExcel', async ({ page }) => {

    const textSearch = "Mango";
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    await downloadPromise;
    writeExcelTest("Mango", 350, { rowChange: 0, colChange: 2 }, "/Users/jigarsony/Downloads/download.xlsx");
    await page.locator('#fileinput').click();
    // uploadFile
    await page.locator('#fileinput').setInputFiles("/Users/jigarsony/Downloads/download.xlsx");
    // this only works when you component have attribute -> type="file"
    // upload is not working
    const textlocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textlocator});
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});
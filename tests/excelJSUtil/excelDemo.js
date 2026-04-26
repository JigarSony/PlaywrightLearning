const ExcelJs = require('exceljs');

async function excelTest() {
    let output = {row:-1,column:-1};
    const workbook = new ExcelJs.Workbook();
    // https://rahulshettyacademy.com/upload-download-test/index.html
    await workbook.xlsx.readFile("/Users/jigarsony/Downloads/excelDownloadTest.xlsx");

    const worksheet = workbook.getWorksheet('Sheet1');

    //get all or specific text
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            //console.log(cell.value) //- print all ExcelSheet
            if (cell.value === "Banana") {
                // console.log(rowNumber);
                // console.log(colNumber);
                output.row=rowNumber;
                output.column=colNumber;
            }
        })
    })

    // replace cell value in excel
    const cell = worksheet.getCell(output.row,output.column);
    cell.value = "Republic";
    await workbook.xlsx.writeFile("/Users/jigarsony/Downloads/excelDownloadTest.xlsx");
}
    excelTest();
// how to run this - locate till this folder - node <fileName>
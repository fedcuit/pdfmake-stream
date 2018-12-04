const express = require("express");
const app = express();
const pump = require("pump");

app.listen(8000, function() {
  console.log("Listen at 8000");
});

app.get("/pdf", function(req, res) {
  const PdfPrinter = require("pdfmake");
  var path = require("path");

  function mp(relFontPath) {
    return path.resolve(__dirname, relFontPath);
  }

  var fonts = {
    Roboto: {
      normal: mp("./fonts/Roboto-Regular.ttf"),
      bold: mp("./fonts/Roboto-Medium.ttf"),
      italics: mp("./fonts/Roboto-Italic.ttf"),
      bolditalics: mp("./fonts/Roboto-MediumItalic.ttf")
    }
  };

  const docDefinition = {
    content: "This is an sample PDF printed with pdfMake"
  };
  var printer = new PdfPrinter(fonts);
  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  res.attachment("testing.pdf");

  pump(pdfDoc, res);
  pdfDoc.end();
});

const express = require("express");
const scrapeWebsite = require("./scape.js");
const pdf = require("pdf-parse");
const fs = require("fs");
const app = express();

app.get("/get-data", async (req, res) => {
  const data = await scrapeWebsite("https://eskooly.com/");
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.title}</title>
    </head>
    <body>
      <h1>data</h1>
      ${data.paras.map((para) => `<p>${para}</p>`).join("")}
    </body>
    </html>
  `;
  res.send(htmlContent);
});

app.get("/read", async (req, res) => {
  try {
    const pdf = require("pdf-parse");
    console.log("Test pdf file");
    // Read the PDF file
    const dataBuffer = fs.readFileSync("./files/two.pdf");

    // Extract text from the PDF
    const data = await pdf(dataBuffer);
    console.log(data);
    res.json(data.text); // Return the extracted text
  } catch (error) {
    console.error("Error reading PDF:", error);
    return null;
  }
});

app.listen(3500, () => {
  console.log("Server is running on port 3500");
});

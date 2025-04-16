const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeWebsite(url) {
  try {
    // Fetch the website content
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extract the title
    const title = $("title").text().trim();

    // Extract the main heading (h1)
    const headings = $("h1").text().trim();

    // Extract all paragraphs and clean them up
    const paras = [];
    $("p").each((index, element) => {
      const paragraph = $(element).text().trim();
      if (paragraph) {
        paras.push(paragraph);
      }
    });

    // Format the scraped data
    const formattedData = {
      title,
      headings,
      paras,
    };

    console.log(formattedData);
    return formattedData;
  } catch (error) {
    console.error("Error scraping:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
}

module.exports = scrapeWebsite;

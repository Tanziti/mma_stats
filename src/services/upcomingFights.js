// scrapeUpcomingFights.js
const axios = require("axios");
const cheerio = require("cheerio");

const scrapeUpcomingFights = async () => {
  try {
    const { data } = await axios.get("https://www.tapology.com/"); // Replace with the target URL
    const $ = cheerio.load(data);
    const fights = [];

    // Example scraping logic - adapt based on the target site’s HTML structure
    $(".fight-card").each((i, element) => {
      const matchup = $(element).find(".fighters").text().trim();
      const date = $(element).find(".fight-date").text().trim();
      fights.push({ matchup, date });
    });

    console.log(fights);
    return fights;
  } catch (error) {
    console.error("Error scraping upcoming fights:", error);
    return [];
  }
};

scrapeUpcomingFights();

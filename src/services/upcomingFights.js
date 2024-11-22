// Use ES module syntax with `import`
import { chromium } from "playwright";

const scrapeUpcomingFights = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to the initial page
    await page.goto("https://www.tapology.com/");

    // Click on the link to navigate to the fights page
    await page.click("a.link-primary-gray"); // Replace with the correct selector

    // Wait for the next page to load
    await page.waitForSelector("a.link-primary-red");

    // Scrape the required information
    const fights = await page.evaluate(() => {
      const fightsData = [];
      document.querySelectorAll(".fight-card").forEach((card) => {
        const matchup = card.querySelector(".fighters")?.textContent.trim();
        const date = card.querySelector(".fight-date")?.textContent.trim();
        fightsData.push({ matchup, date });
      });
      return fightsData;
    });

    console.log(fights);
    return fights;
  } catch (error) {
    console.error("Error scraping upcoming fights:", error);
    return [];
  } finally {
    await browser.close();
  }
};

// Run the scraping function
scrapeUpcomingFights();

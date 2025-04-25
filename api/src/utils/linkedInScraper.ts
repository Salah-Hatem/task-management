import * as puppeteer from 'puppeteer';

export async function scrapeLinkedInProfile(profielUrl: string) {
  const linkedInUrl = 'https://www.linkedin.com/login';
  const username = process.env.LINKEDIN_EMAIL; // Set in .env file
  const password = process.env.LINKEDIN_PASSWORD; // Set in .env file
  const profileUrl = profielUrl;

  if (!username || !password) {
    throw new Error(
      'LinkedIn credentials are missing in environment variables.',
    );
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  try {
    // Perform login
    await loginToLinkedIn(page, linkedInUrl, username, password);

    // Navigate to the profile URL
    await page.goto(profileUrl);

    // Scrape profile data
    const profileData = await scrapeProfileData(page);
    console.log('Scraped Profile Data:', profileData);

    return profileData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await browser.close();
  }
}
async function loginToLinkedIn(
  page: puppeteer.Page,
  linkedInUrl: string,
  username: string,
  password: string,
) {
  try {
    console.log('Navigating to LinkedIn login page...');
    await page.goto(linkedInUrl, { waitUntil: 'domcontentloaded' });

    console.log('Entering credentials...');
    await page.type('#username', username);
    await page.type('#password', password);

    console.log('Submitting login form...');

    await Promise.all([
      page.click('.login__form_action_container button'),
      page.waitForResponse(
        (response) =>
          response.url().includes('/feed') && response.status() === 200,
      ),
    ]);

    console.log('Login successful.');
  } catch (error) {
    throw new Error(`LinkedIn login failed: ${error}`);
  }
}

async function scrapeProfileData(page: puppeteer.Page) {
  try {
    console.log('Scraping profile data...');
    return await page.evaluate(() => {
      const nameElement = document.querySelector('section.artdeco-card h1');
      const imageElement = document.querySelector(
        'img.pv-top-card-profile-picture__image--show',
      );

      const name = nameElement?.textContent?.trim() || '';
      const imageUrl = (imageElement as HTMLImageElement)?.src || '';

      return { name, imageUrl };
    });
  } catch (error) {
    throw new Error(`Failed to scrape profile data: ${error}`);
  }
}

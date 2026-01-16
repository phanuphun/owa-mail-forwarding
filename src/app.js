import puppeteer from 'puppeteer';
import dotenv from 'dotenv'
import { sleep } from './helper/sleep.js';
import login from './utils/login.pup.js';
import logout from './utils/logout.pup.js';
import filterUnreadMails from './utils/filterUnreadMails.pup.js';
import getVisibleMailCount from './utils/getVisibleMailCount.pup.js';
import openMail from './utils/openMail.js';
import clearFilter from './utils/clearFilter.js';
dotenv.config();

const baseUrl = process.env.MAIL_URL;
const usrMail = process.env.USR_MAIL;
const usrPwd = process.env.USR_PWD;
const forwardMail = process.env.FORWARD_MAIL;

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
page.setDefaultTimeout(30000); // 30 seconds 

await page.goto(baseUrl , {waitUntil: 'domcontentloaded'});
await page.setViewport({width: 1080, height: 1024});

// Login Page
await login(page, usrMail , usrPwd);
await sleep(1000); 
await filterUnreadMails(page);

// close filter menu overlay
await page.keyboard.press('Escape'); 
await sleep(500);

const totalMailFounded = await getVisibleMailCount(page);
console.log(`[3] : Visible unread mails: ${totalMailFounded}`);
if (totalMailFounded === 0) {
    console.log("No unread mails found. Exiting.");
    await logout(page);
    await browser.close();
    process.exit(0);
}

for (let i = 0; i < totalMailFounded; i++) {
    await openMail(page, i);
    await sleep(1000);
    await clearFilter(page);
    await filterUnreadMails(page);
    await sleep(500);
    console.log(`[5] : Opened mail ${i + 1} of ${totalMailFounded}.`);
}

// logout หลังทำครบ
await logout(page);
await browser.close();
process.exit(0);
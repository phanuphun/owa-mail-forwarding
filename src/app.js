import puppeteer from 'puppeteer';
import dotenv from 'dotenv'
import {sleep} from './helper/sleep.js';
import loginAction from './owa/actions/login.action.js';
import mailAction from './owa/actions/mail.action.js';
dotenv.config();

const owaUrl = process.env.MAIL_URL;
const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    defaultViewport: null,
    args: ['--start-maximized'],
});
const page = await browser.newPage({});
page.setDefaultTimeout(30000);
await page.goto(owaUrl , {waitUntil: 'domcontentloaded'});

async function stopProcess() {
    await loginAction.logout(page);
    await browser.close();
    console.log("[xxxx] : Process stopped due to no unread mails.");
    process.exit(0);
}

// [1] Login Page
await loginAction.login(page);

// [2] Mail Page - Filter Unread Mails
await mailAction.openFilterMenu(page);
await mailAction.clickUnreadFilterMenu(page);

// [3] Get Visible Unread Mail Count
let totalMailsFounded = 0;
await mailAction.clearFilterOverlayMenu(page);
await mailAction.findMailItems(page).then(async (totalItems)=>{
    if (totalItems === 0) return stopProcess()
    else totalMailsFounded = totalItems;
})

// [4] Process each mail
while(true) {
    await mailAction.clickMail(page, 0);
    await sleep(500);
    await mailAction.openMailMenu(page, 0);
    await mailAction.clickMailForwardMenu(page, 0);
    await mailAction.fillForwardAddress(page);
    await mailAction.clickSendMailButton(page);
    await mailAction.clickMailDetailMoreMenu(page, 0); 
    await mailAction.clickMarkAsReadMenu(page, 0);

    // clear filter and re-apply
    await mailAction.clearFilterMenu(page);
    await mailAction.openFilterMenu(page);
    await mailAction.clickUnreadFilterMenu(page);
    await mailAction.clearFilterOverlayMenu(page);

    totalMailsFounded -= 1;
    if (totalMailsFounded == 0) break;
}

await stopProcess();

import { sleep } from "../../helper/sleep.js";
import { MAIL_XPATH , MAIL_SELECTORS} from "../selectors/mail.selector.js";
import loginActions from "./login.action.js";
import dotenv from 'dotenv';
dotenv.config();

const forwardTo = process.env.FORWARD_MAIL;

// [2] Mail Page - Filter Unread Mails
async function openFilterMenu(page , idx) {
    const filterMenuButton = await page.locator(`::-p-xpath(${MAIL_XPATH.FILTER_MENU})`);
    await filterMenuButton.wait({ state: 'visible', timeout: 30000 });
    await filterMenuButton.click();
    if (idx == 0) console.log("[2.1] : Opened filter menu.");
    else console.log(`[2.1] : Re-opened filter menu for mail at index ${idx}.`);
}

async function clickUnreadFilterMenu(page) {
    const unreadFilterMenuButton = await page.locator(`::-p-xpath(${MAIL_XPATH.UNREAD_MAIL_FILTER_MENU})`);
    await unreadFilterMenuButton.wait({ state: 'visible', timeout: 30000 });
    await unreadFilterMenuButton.click();
    console.log("[2.2] : Selected 'Unread' filter.");
}

async function clearFilterOverlayMenu(page) {
    await sleep(500);
    await page.keyboard.press('Escape');
    await sleep(500);

}

// [3] Get Visible Unread Mail Count
export async function findMailItems(page) {
    let totalItems = await page.evaluate((selector) => {
        const lb = document.querySelector(selector.MAIL_CONTAINER_LISTBOX);
        return lb ? lb.querySelectorAll(selector.MAIL_ITEMS).length : 0;;
    }, MAIL_SELECTORS);
    console.log(`[3.1] : Found ${totalItems} visible unread mails.`);
    return totalItems;
}

export async function clickMail(page,idx) {
    // Ensure mail list is loaded
    console.log(`[3.2] : Preparing to open mail at index ${idx}.`);
    const target = await page.evaluateHandle((selector) => {
        const lb = document.querySelector(selector.MAIL_CONTAINER_LISTBOX);
        const row = lb?.querySelector('div[role="option"][tabindex="0"]') || lb?.querySelector(selector.MAIL_ITEMS);
        return row?.querySelector('span.lvHighlightSubjectClass') || row;
    }, MAIL_SELECTORS);
    
    // Get element handle
    console.log(`[3.3] : Retrieved mail item handle at index ${idx}.`);
    const el = target.asElement();
    if (!el) throw new Error('No mail item found');

    // Scroll into view
    await el.evaluate(e => e.scrollIntoView({ block: 'center' }));
    await sleep(100);
    
    console.log(`[3.4] : Clicking to open mail at index ${idx}.`);
    const b = await el.boundingBox();
    if (!b) throw new Error('Target hidden/covered');
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2, { delay: 30 });
    console.log(`[3.5] : Opened mail at index ${idx}.`);    
}

export async function openMailMenu(page, idx) {
    const mailDetailMenuButton = await page.locator(`::-p-xpath(${MAIL_XPATH.MAIL_DETAIL_MENU})`);
    await mailDetailMenuButton.wait({ state: 'visible', timeout: 30000 });
    await mailDetailMenuButton.click();
    console.log(`[4.1] : Opened mail options for mail at index ${idx}.`);
}

export async function clickMailForwardMenu(page, idx) {
    const mailForwardMenuButton = await page.locator(`::-p-xpath(${MAIL_XPATH.MAIL_FORWARD_MENU})`);
    await mailForwardMenuButton.wait({ state: 'visible', timeout: 30000 });
    await mailForwardMenuButton.click();
    console.log(`[4.2] : Clicked 'Forward' option for mail at index ${idx}.`);
}

export async function fillForwardAddress(page) {
    const toInputXPath = page.locator(`::-p-xpath(${MAIL_XPATH.FORWARD_MAIL_INPUT})`);
    await toInputXPath.wait({ state: 'visible', timeout: 30000 });
    await toInputXPath.click();
    await toInputXPath.fill(forwardTo, { delay: 10 });
    console.log(`[4.3] : Filled forward address: ${forwardTo}.`);
}

export async function clickSendMailButton(page) {
    const sendMailButton = await page.locator(`::-p-xpath(${MAIL_XPATH.SEND_MAIL_BUTTON})`);
    await sendMailButton.wait({ state: 'visible', timeout: 30000 });
    await sendMailButton.click();
    console.log(`[4.4] : Clicked 'Send' button to send forwarded mail.`);
} 

export async function clickMailDetailMoreMenu(page) {
    const mailDetailMoreMenuButton = await page.locator(`::-p-xpath(${MAIL_XPATH.MAIL_DETAIL_MORE_MENU})`);
    await mailDetailMoreMenuButton.wait({ state: 'visible', timeout: 30000 });
    await mailDetailMoreMenuButton.click();
    console.log(`[4.5] : Opened 'More actions' menu in mail detail pane.`);
}

export async function clickMarkAsReadMenu(page, idx) {
    const markAsReadMenuButton = await page.locator(`::-p-xpath(${MAIL_XPATH.MARK_AS_READ_MENU})`);
    await markAsReadMenuButton.wait({ state: 'visible', timeout: 30000 });
    await markAsReadMenuButton.click();
    console.log(`[4.6] : Clicked 'Mark as read' option for mail at index ${idx}.`);
}

export async function clearFilterMenu(page) {
    const clearFilterMenuButton = await page.locator(`::-p-xpath(${MAIL_XPATH.CLEAR_FILTER_MENU})`);
    await clearFilterMenuButton.wait({ state: 'visible', timeout: 30000 });
    await clearFilterMenuButton.click();
    console.log(`[4.7] : Clicked 'Clear filter' option.`);
}

const mailActions = {
    openFilterMenu,
    clickUnreadFilterMenu,
    clearFilterOverlayMenu,
    findMailItems,
    clickMail,
    openMailMenu,
    clickMailForwardMenu,
    fillForwardAddress,
    clickSendMailButton,
    clickMailDetailMoreMenu,
    clickMarkAsReadMenu,
    clearFilterMenu,
};

export default mailActions;
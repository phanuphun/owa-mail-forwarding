import { sleep } from "../helper/sleep.js";

export default async function markAsRead(page, index) {
    const markAsReadXPath = "//*[@role='menu']//button[@role='menuitem' and .//span[normalize-space()='Mark as read']]";
    await page.locator(`::-p-xpath(${markAsReadXPath})`).click();
    console.log(`[4.2] : Marked mail at index ${index} as read.`);
}
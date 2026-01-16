export default async function clearFilter(page) {
    const unreadFilterBtnXPath = "//*[@id='primaryContainer']//button[@aria-haspopup='true' and .//span[normalize-space()='Unread']]";
    await page.locator(`::-p-xpath(${unreadFilterBtnXPath})`).click();
    console.log("[2] : Unread filter created.");
}
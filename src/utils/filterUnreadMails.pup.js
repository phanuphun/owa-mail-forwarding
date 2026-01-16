export default async function filterUnreadMails(page) {
    const filterXPath = "//*[@id='primaryContainer']//button[@aria-haspopup='true' and .//span[normalize-space()='Filter']]";
    await page.locator(`::-p-xpath(${filterXPath})`).click();
    
    const unreadXPath = "//*[@role='menu']//button[@role='menuitemcheckbox' and .//span[normalize-space()='Unread']]";
    await page.locator(`::-p-xpath(${unreadXPath})`).click();
    
    console.log("[2] : Filter Unread mails selected.");
}

export default async function markAsReadV2(page, index) {
  const markAsReadXPath = "//*[@role='menu']//button[@role='menuitem' and .//span[normalize-space()='Mark as read']]";
  await page.locator(`::-p-xpath(${markAsReadXPath})`).click();
  console.log(`[4.2] : Marked mail at index ${index} as read.`);
}
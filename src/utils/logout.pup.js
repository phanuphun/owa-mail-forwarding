export default async function logout(page) {
    const personaMenuXPath = "//*[@id='primaryContainer']//button[@aria-haspopup='true' and contains(@aria-label,'menu with submenu') and contains(@aria-label,'First - Panuphan N.')]";
    await page.locator(`::-p-xpath(${personaMenuXPath})`).click();
    console.log("[x] : Personal menu clicked.");
    const signOutXPath = "//*[@role='menu']//button[@role='menuitem' and .//span[normalize-space()='Sign out']]";
    await page.locator(`::-p-xpath(${signOutXPath})`).click();
    console.log("[x] : Sign out clicked.");
}
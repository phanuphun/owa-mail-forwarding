export default async function openMailOption(page, Index) {
    const mailOption = "//*[@id='primaryContainer']//button[@aria-haspopup='true' and (@title='More actions' or @aria-label='More Actions')]";
    await page.locator(`::-p-xpath(${mailOption})`).click();
    console.log(`[4.1] : Opened mail options for mail at index ${Index}.`);
}
export default async function login(page , username , password) {
    await page.waitForSelector("#username", { visible: true });
    await page.click("#username" , {clickCount: 3});
    await page.keyboard.press('Backspace');
    await page.type("#username" , username);
    
    await page.click("#password" , {clickCount: 3});
    await page.keyboard.press('Backspace');
    await page.type("#password" , password);

    const signInSelector = "#lgnDiv > div.signInEnter > div";
    await page.waitForSelector(signInSelector, { visible: true });
    await page.click(signInSelector);

    console.log("[1] : Login step done. If MFA prompt appears, complete it manually.");
}
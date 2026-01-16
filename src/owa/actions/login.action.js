import dotenv from 'dotenv';
dotenv.config();
import { LOGIN_XPATH } from '../selectors/login.selector.js';

const USERNAME = process.env.USR_MAIL;
const PASSWORD = process.env.USR_PWD;

// login functions
async function fillLoginForm(page , username, password) {
    const usernameInput = await page.locator(`::-p-xpath(${LOGIN_XPATH.USERNAME_INPUT})`)
    await usernameInput.wait({ state: 'visible' , timeout: 30000 });
    await usernameInput.click();
    await usernameInput.fill(username , { delay: 10 });
    console.log("[1.1] : Filled username.");

    const passwordInput = await page.locator(`::-p-xpath(${LOGIN_XPATH.PASSWORD_INPUT})`)
    await passwordInput.wait({ state: 'visible' , timeout: 30000 });
    await passwordInput.click();
    await passwordInput.fill(password , { delay: 10 });
    console.log("[1.2] : Filled password.");
}

async function submitLoginForm(page) {
    const signInButton = await page.locator(`::-p-xpath(${LOGIN_XPATH.SIGNIN_BUTTON})`);
    await signInButton.wait({ state: 'visible' , timeout: 30000 });
    await signInButton.click();
    console.log("[1.3] : Submitted login form.");
}

async function login(page) {
    await fillLoginForm(page, USERNAME, PASSWORD);
    await submitLoginForm(page);
    console.log("[1.4] : Logged in successfully.");
}

// logout functions
async function clickPersonalMenu(page) {
    const personalMenu = await page.locator(`::-p-xpath(${LOGIN_XPATH.PERSONAL_ACCOUNT_MENU})`);
    await personalMenu.wait({ state: 'visible' , timeout: 30000 });
    await personalMenu.click();
    console.log("[x] : Personal menu clicked.");
}

async function clickSignOutButton(page) {
    const signOutButton = await page.locator(`::-p-xpath(${LOGIN_XPATH.SIGNOUT_BUTTON})`);
    await signOutButton.wait({ state: 'visible' , timeout: 30000 });
    await signOutButton.click();
    console.log("[xx] : Sign out clicked.");
}

async function logout(page) {
    await clickPersonalMenu(page);
    await clickSignOutButton(page);
    console.log("[xxx] : Logged out successfully.");
}

const loginActions = {
    login,
    logout,
}

export default loginActions;
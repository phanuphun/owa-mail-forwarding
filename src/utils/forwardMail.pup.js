import dotenv from 'dotenv';
import { sleep } from '../helper/sleep.js';
dotenv.config();

const forwardTo = process.env.FORWARD_MAIL;

export default async function forwardMail(page, Index) {
    const forwardXPath = "//*[@role='menu']//button[@role='menuitem' and .//span[normalize-space()='Forward']]";
    await page.locator(`::-p-xpath(${forwardXPath})`).click();
    console.log(`[4.3] : Forwarded mail at index ${Index}.`);
    await fillForwardAddress(page, forwardTo);
    await sleep(1000); // wait for address to be filled
    await sendMail(page);
    console.log(`[4.4] : Sent forwarded mail at index ${Index} to ${forwardTo}.`);
}

async function sendMail(page) {
    const sendXPath = "//*[@id='primaryContainer']//button[(@aria-label='Send' or @title='Send') and normalize-space(.)='Send']";
    await page.locator(`::-p-xpath(${sendXPath})`).click();
}

async function fillForwardAddress(page, address) {
  await page.waitForSelector('#primaryContainer', { visible: true });
  const toInputXPath =
    "//*[@id='primaryContainer']" +
    "//*[self::input or self::textarea]" +
    "[contains(@aria-label,'To') or contains(@placeholder,'To') or @name='to']";
  const loc = page.locator(`::-p-xpath(${toInputXPath})`);
  await loc.wait({ state: 'visible', timeout: 30000 });
  await loc.click();
  await page.keyboard.down('Control'); 
  await page.keyboard.press('A'); 
  await page.keyboard.up('Control');
  await page.keyboard.type(address, { delay: 10 });
}
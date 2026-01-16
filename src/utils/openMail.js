import { sleep } from "../helper/sleep.js";
import forwardMail from "./forwardMail.pup.js";
import markAsRead from "./markAsRead.js";
import markAsReadV2 from "./markAsReadV2.js";
import openMailOption from "./openMailOption.pup.js";

export default async function openMail(page, index) {
    const listbox = 'div[role="listbox"][aria-label="conversation"]';
    await page.waitForSelector(listbox, { visible: true }); // Make sure container mail list is loaded
    await page.waitForFunction(() => { // wait for at least one mail item
      const lb = document.querySelector('div[role="listbox"][aria-label="conversation"]');
      return lb && lb.querySelector('div[role="option"]'); // at least one mail item ,
    }, { timeout: 30000 });
    
    const target = await page.evaluateHandle(() => {
      const lb = document.querySelector('div[role="listbox"][aria-label="conversation"]');
      const row = lb?.querySelector('div[role="option"][tabindex="0"]') || lb?.querySelector('div[role="option"]');
      return row?.querySelector('span.lvHighlightSubjectClass') || row;
    });
    
    const el = target.asElement();
    if (!el) throw new Error('No mail item found');
    
    await el.evaluate(e => e.scrollIntoView({ block: 'center' }));
    await sleep(100);
    
    const b = await el.boundingBox();
    if (!b) throw new Error('Target hidden/covered');
    
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2, { delay: 30 });
    console.log(`[3] : Opened mail at index ${index}.`);
    await sleep(2000); // wait for mail content to load
    // Todo List
    await openMailOption(page, index);
    await forwardMail(page, index);
    await sleep(500);
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2, { button: 'right', delay: 30 });
    await markAsReadV2(page, index);
    await sleep(1000);
    return;
}


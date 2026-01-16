export default async function getVisibleMailCount(page) {
  return await page.evaluate(() => {
    const lb = document.querySelector('div[role="listbox"][aria-label="conversation"]');
    return lb ? lb.querySelectorAll('div[role="option"]').length : 0;
  });
}
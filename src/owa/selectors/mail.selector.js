export const MAIL_XPATH = {
    FILTER_MENU: "//*[@id='primaryContainer']//button[@aria-haspopup='true' and .//span[normalize-space()='Filter']]",
    UNREAD_MAIL_FILTER_MENU:"//*[@role='menu']//button[@role='menuitemcheckbox' and .//span[normalize-space()='Unread']]",
    MAIL_CONTAINER_LISTBOX: "//div[@role='listbox' and @aria-label='conversation']",
    MAIL_ITEMS:".//div[@role='option']",
    MAIL_DETAIL_MENU: "//*[@id='primaryContainer']//button[@aria-haspopup='true' and (@title='More actions' or @aria-label='More Actions')]",
    MAIL_FORWARD_MENU: "//*[@role='menu']//button[@role='menuitem' and .//span[normalize-space()='Forward']]",
    FORWARD_MAIL_INPUT: "//*[@id='primaryContainer']//*[self::input or self::textarea][contains(@aria-label,'To') or contains(@placeholder,'To') or @name='to']",
    SEND_MAIL_BUTTON: "//*[@id='primaryContainer']//button[(@aria-label='Send' or @title='Send') and normalize-space(.)='Send']",

    MAIL_DETAIL_MORE_MENU: "//button[@type='button' and contains(translate(@title,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'more actions')]",
    MARK_AS_READ_MENU: "//*[@role='menu']//button[@role='menuitem' and .//span[normalize-space()='Mark as read']]",

    CLEAR_FILTER_MENU: "//*[@id='primaryContainer']//button[@aria-haspopup='true' and .//span[normalize-space()='Unread']]",
}

export const MAIL_SELECTORS = {
    MAIL_CONTAINER_LISTBOX: 'div[role="listbox"][aria-label="conversation"]',
    MAIL_ITEMS: 'div[role="option"]',
    MAIL_DETAIL_MENU: 'button[aria-haspopup="true"][title="More actions"], button[aria-haspopup="true"][aria-label="More Actions"]',
    SEND_MAIL_BUTTON: 'button[aria-label="Send"], button[title="Send"]'
}


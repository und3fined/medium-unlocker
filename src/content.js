/**
 * File: content.js
 * Project: medium-unlocker
 * File Created: 23 Dec 2021 10:33:39
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 23 Dec 2021 14:38:50
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */

chrome.runtime.sendMessage({ request: "fetch-cookie" });

document.body.style.border = "5px solid red";

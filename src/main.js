/**
 * File: background.js
 * Project: svelte-app
 * File Created: 22 Dec 2021 14:17:58
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 22 Dec 2021 15:23:25
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
import { generateCookie } from './medium/generate-cookie';

var targetPage = "https://medium.com";

// Add the new header to the original array,
// and return it.
function setCookie(e) {
  var setMyCookie = {
    name: "Set-Cookie",
    value: "my-cookie1=my-cookie-value1"
  };
  e.responseHeaders.push(setMyCookie);
  return {responseHeaders: e.responseHeaders};
}

// Listen for onHeaderReceived for the target page.
// Set "blocking" and "responseHeaders".
browser.webRequest.onHeadersReceived.addListener(
  setCookie,
  {urls: [targetPage]},
  ["blocking", "responseHeaders"]
);

generateCookie();

document.body.style.border = "5px solid red";

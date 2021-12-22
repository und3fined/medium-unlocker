/**
 * File: generate-cookie.js
 * Project: medium-unlocker
 * File Created: 22 Dec 2021 14:42:26
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 22 Dec 2021 15:13:13
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
export const targetPage = "https://medium.com"; // /?utm=medium-unlocker

export function generateCookie() {
  document.title = "Unlocking...";
  // fetch(targetPage, {
  //   method: "GET",
  //   cache: "no-cache",
  // })
  //   .then((response) => {
  //     console.log("response", response);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
}

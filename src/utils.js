/**
 * File: utils.js
 * Project: medium-unlocker
 * File Created: 23 Dec 2021 11:12:59
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 23 Dec 2021 11:13:33
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */

exports.generateCookie = () => {
  fetch('https://medium.com/?ref=google.com', {
    method: 'GET',
    headers: {
      Referer: 'https://www.google.com/search?q=medium&source=hp',
    }
  })
}
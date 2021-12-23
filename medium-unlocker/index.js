/**
 * File: index.js
 * Project: medium-unlocker
 * File Created: 23 Dec 2021 11:27:58
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 23 Dec 2021 11:52:16
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
const UserAgent = require('user-agents');
const axios = require('axios');

module.exports = async function (context, req) {
  const userAgent = new UserAgent();
  const resp = await axios({
    method: 'get',
    url: 'https://medium.com',
    header: {
      'User-Agent': userAgent.random().toString(),
    },
    responseType: 'text/html',
  });

  context.res = {
    status: 200,
    body: resp.headers,
  };
};

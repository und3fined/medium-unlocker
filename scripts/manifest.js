/**
 * File: manifest.js
 * Project: svelte-app
 * File Created: 22 Dec 2021 14:27:33
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 22 Dec 2021 14:38:15
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
const fs = require("fs");
const path = require("path");
const manifest = require("../src/manifest.json");
const { domainList } = require("../src/constants");

manifest.version = process.env.npm_package_version;
manifest.content_scripts[0].matches = domainList;
manifest.permissions = [...manifest.permissions, ...domainList];

const manifestDest = path.join(__dirname, "../public/manifest.json");

fs.writeFileSync(manifestDest, JSON.stringify(manifest, "", 2), {
  encoding: "utf8",
  mode: 0o666,
});

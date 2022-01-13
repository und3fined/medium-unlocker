/**
 * File: main.js
 * Project: medium-unlocker
 * File Created: 19 Nov 2021 19:34:40
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 13 Jan 2022 10:34:40
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
import App from "./App.svelte";

const mediumUnlockerId = "medium-unlocker";
const unlockerElm = document.getElementById(mediumUnlockerId);

if (!unlockerElm) {
  const newUnlockerElm = document.createElement("div");
  newUnlockerElm.setAttribute("id", mediumUnlockerId);
  document.body.appendChild(newUnlockerElm);
}

const app = new App({
  target: document.querySelector(`#${mediumUnlockerId}`),
  props: {
    name: 'Medium Unlocker'
  }
});

export default app;

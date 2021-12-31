<!--
 | File: App.svelte
 | Project: medium-unlocker
 | File Created: 31 Dec 2021 20:33:17
 | Author: und3fined (me@und3fined.com)
 | -----
 | Last Modified: 31 Dec 2021 21:31:07
 | Modified By: und3fined (me@und3fined.com)
 | -----
 | Copyright (c) 2021 und3fined.com
-->
<script>
  import { onMount } from 'svelte';
  import { memberShipId, registerWall } from './constants';
  import { hasElm } from './utils';

  export let name;

  onMount(() => {
    const interval = setInterval(() => {
      if (!!hasElm(memberShipId) || !!hasElm(registerWall)) {
        window.location.reload();
      }
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

<div style="position:fixed;top:0;right:0;z-index:9999;width:64px;height:64px">
  <h1 style="visibility: hidden;">{name}</h1>
</div>
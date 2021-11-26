<script lang="ts">
const { unlink } = require("fs")
import { get } from "svelte/store";

import { selectedFile } from "../../data/dynamic-menus";
import { openedFilePath } from "../../data/main-view";
import { showDeleteFilePrompt } from "../../data/prompts";
const close = () => {
  showDeleteFilePrompt.set(false) 
}
const deleteFile = () => {
  unlink(`${get(openedFilePath)}/${get(selectedFile)}`, (err) => {
    if(err) {
      alert(err)
    }
  })
  showDeleteFilePrompt.set(false)
}
</script>

{#if $showDeleteFilePrompt}
  <div class="window is-bright" id="dialog-demo" role="dialog" aria-labelledby="dialog-title">
    <div class="title-bar">
      <div class="title-bar-text" id="dialog-title">Delete File</div>
      <div class="title-bar-controls">
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body">
      <p class="instruction">Are you sure you want to permanently delete this file?</p>
      <p class="instruction">{$selectedFile}</p>
    </div>
    <footer style="text-align: right">
      <button on:click="{deleteFile}">Yes</button>
      <button on:click="{close}">No</button>
    </footer>
  </div> 
{/if}

<style>
    div.window {
        opacity: 100;
        visibility: visible;
    }
</style>
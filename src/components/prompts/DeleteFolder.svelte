<script lang="ts">
const { rmdir } = require("fs")
import { get } from "svelte/store";

import { selectedFile, selectedFolder } from "../../data/dynamic-menus";
import { openedFilePath} from "../../data/main-view";
import { showDeleteFilePrompt, showDeleteFolderPrompt } from "../../data/prompts";

const close = () => {
  showDeleteFolderPrompt.set(false) 
}
const deleteFile = () => {
  rmdir(`${get(selectedFolder)}`, {recursive: true}, (err) => {
    if(err) {
      alert(err)
    }
  })
  showDeleteFolderPrompt.set(false)
}
</script>

{#if $showDeleteFolderPrompt}
  <div class="window is-bright" id="dialog-demo" role="dialog" aria-labelledby="dialog-title">
    <div class="title-bar">
      <div class="title-bar-text" id="dialog-title">Delete File</div>
      <div class="title-bar-controls">
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body">
      <p class="instruction">Are you sure you want to permanently delete this folder?</p>
      <p class="instruction">{$selectedFolder}</p>
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
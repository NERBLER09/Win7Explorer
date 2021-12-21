<script lang="ts">
const path = require('path');

const {rename} = require("fs")

import { get } from "svelte/store";
import { selectedFile, selectedFolder, selectedItemName } from "../../data/dynamic-menus";
import { openedFilePath } from "../../data/main-view";

import { renameItem, showRenamePrompt } from "../../data/prompts";

let newName = ""

const renameItemFunction = () => {
    if(get(renameItem) === "file") {
       rename(`${get(openedFilePath)}/${get(selectedFile)}`, `${get(openedFilePath)}/${newName}`, (error) => {
            if(error) {
                alert(error)
            }
        })

        showRenamePrompt.set(false)
    }
    else {
        rename(`${get(selectedFolder)}`, `${get(openedFilePath)}/${newName}`, (error) => {
            if(error) {
                alert(error)
            }
        })

        showRenamePrompt.set(false)
    }
}

const close = () => {
    showRenamePrompt.set(false)
}

let renameElement: HTMLInputElement = null

selectedItemName.subscribe(value => {
    newName = value
})

const selectText = (renameElement) => {
    if(renameElement === null) return
    renameElement.focus()
    renameElement.setSelectionRange(0, get(selectedItemName).length - path.extname(get(selectedItemName)).length)
}

$: selectText(renameElement)
</script>

{#if $showRenamePrompt}
    <div class="window is-bright" id="dialog-demo" role="dialog" aria-labelledby="dialog-title">
        <div class="title-bar">
            <div class="title-bar-text" id="dialog-title">Rename  {$renameItem === "file" ? 'File' : "Folder"}</div>
            <div class="title-bar-controls">
            <button aria-label="Close" on:click="{close}"></button>
            </div>
        </div>
        <div class="window-body">
            <form on:submit|preventDefault="{renameItemFunction}">
                <label for="name-input">New name:</label>
                <input type="text" id="name-input" bind:value="{newName}" bind:this="{renameElement}">
            </form>
        </div>
        <footer style="text-align: right">
            <button on:click="{renameItemFunction}">Rename</button>
            <button on:click="{close}">Cancel</button>
        </footer>
    </div>
{/if}
<style>
    div.window {
        opacity: 100;
        visibility: visible;
    }

    input {
        width: 300px;
    }
</style>
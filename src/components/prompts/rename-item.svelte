<script lang="ts">
const {rename} = require("fs")

import { get } from "svelte/store";
import { selectedFile, selectedFolder } from "../../data/dynamic-menus";
import { openedFilePath } from "../../data/main-view";

import { renameItem, showRenamePrompt } from "../../data/prompts";

let newName = ""

const renameItemFunction = () => {
    if(get(renameItem) === "file") {
        const containsFileExtension = checkForFileExtension()[0]
        const fileExtension = checkForFileExtension()[1]

        if(!containsFileExtension) {
            newName = `${newName}${fileExtension}`
        }

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

// Checks if new name includes file extension
const checkForFileExtension = (): [boolean, string?] => {
    const re = /(?:\.([^.]+))?$/; // Gets the file extension

    const originalExtension = re.exec(`${get(selectedFile)}`)[0]

    if(newName.includes(originalExtension)) {
        return [true]
    }
    else {
        return [false, originalExtension]
    }
}
</script>

{#if $showRenamePrompt}
    <div class="window is-bright" id="dialog-demo" role="dialog" aria-labelledby="dialog-title">
        <div class="title-bar">
            <div class="title-bar-text" id="dialog-title">Rename  {$renameItem === "file" ? 'File' : "Folder"}</div>
            <div class="title-bar-controls">
            <button aria-label="Close"></button>
            </div>
        </div>
        <div class="window-body">
            <form action="">
                <label for="name-input">New name:</label>
                <input type="text" id="name-input" bind:value="{newName}">
            </form>
        </div>
        <footer style="text-align: right">
            <button on:click="{renameItemFunction}">Rename</button>
            <button>Cancel</button>
        </footer>
    </div>
{/if}
<style>
    div.window {
        opacity: 100;
        visibility: visible;
    }
</style>
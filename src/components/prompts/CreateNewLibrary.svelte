<script lang="ts">

import { onMount } from "svelte";
import { get } from "svelte/store";
import { customLibraries, customLibraryType } from "../../data/main-view";

import { showNewLibraryPopup } from "../../data/prompts";

const { existsSync } = require("fs")

let libraryName = ""
let selectedDirectory = process.env.HOME

let enableCreateButton = false

const checkToCreateNewLibrary = () => {
    if(libraryName !== "" || selectedDirectory === "") {
        enableCreateButton = false
    }
    else {
        enableCreateButton = true
    }
}

const createNewLibrary = () => {
    if(existsSync(selectedDirectory)) {
        const customLibraryItem: customLibraryType = {
            name: libraryName,
            path: selectedDirectory
        }
        customLibraries.update(value => [customLibraryItem, ...value])
        showNewLibraryPopup.set(false)

        localStorage.setItem("customLibraries", JSON.stringify(get(customLibraries)))
    } 
    else {
        alert("Folder not found. Please enter a valid path.") 
    }
}

onMount(() => {
    checkToCreateNewLibrary()
})

const close = () => {
    showNewLibraryPopup.set(false)
}
</script>

{#if $showNewLibraryPopup}
    <div class="window is-bright" id="dialog-demo" role="dialog" aria-labelledby="dialog-title">
    <div class="title-bar">
        <div class="title-bar-text" id="dialog-title">Create a new library</div>
        <div class="title-bar-controls">
        <button aria-label="Close" on:click="{close}"></button>
        </div>
    </div>
    <div class="window-body">
        <form on:submit|preventDefault="{createNewLibrary}">
            <label for="name-input">Library Name:</label><input type="text" id="name-input" bind:value="{libraryName}" placeholder="New Library" on:change="{checkToCreateNewLibrary}">
            <br>
            <label for="dir-select">Enter the path to the folder: </label><input type="text" id="dir-select" bind:value="{selectedDirectory}" on:change="{checkToCreateNewLibrary}">
        </form>
    </div>
    <footer style="text-align: right">
        <button disabled="{enableCreateButton}" on:click="{createNewLibrary}">Create</button>
        <button on:click="{close}">Cancel</button>
    </footer>
    </div>

{/if}

<style>
    div.window {
        opacity: 100;
        visibility: visible;
    }
</style>
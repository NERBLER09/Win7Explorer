<script lang="ts">
import { onMount } from "svelte";

import { showFileContextMenu, showFolderContextMenu, showGlobalContextMenu } from "../../data/main-view";
import { isWindowFullScreen } from "../../data/window";

import Menubar from "./menubar.svelte";

const closeWindow = () => {
    window.close()
}

const {ipcRenderer} = require("electron")

// Maximizes the window 
const maximizeWindow = () => {
    ipcRenderer.send("maximize")
}
  
// Minimizes the window
const minimizeWindow = () => {
    ipcRenderer.send("minimize")
}

const checkIfWindowIsMaximized = () => {
    if(window.outerHeight === screen.availHeight) {
        isWindowFullScreen.set(true)
    }
    else {
        isWindowFullScreen.set(false)
    }
}

onMount(() => {
    checkIfWindowIsMaximized()
})
</script>

<svelte:window on:resize="{checkIfWindowIsMaximized}"></svelte:window>
<div class="window">
    <div class="title-bar">
        <div class="title-bar-text"></div>
        <div class="title-bar-controls">
            <button aria-label="Minimize" on:click="{minimizeWindow}"></button>
            <button aria-label="{$isWindowFullScreen === true ? 'Restore' : 'Maximize'}" on:click="{maximizeWindow}"></button>
            <button aria-label="Close" on:click="{closeWindow}"></button>
        </div>
    </div>
    <Menubar/>
    <div class="window-body" on:click="{() => {
        showFileContextMenu.set(false) 
        showFolderContextMenu.set(false)
        showGlobalContextMenu.set(false)
    }}">
        <slot></slot>
    </div>
</div>

<style>
    .window-body {
        height: calc(100vh - 79px);
        padding: 0;
        background-color: white;
    }
    .title-bar-text {
        -webkit-app-region: drag;
        width: 100% !important;
        height: 16px;
    }
</style>
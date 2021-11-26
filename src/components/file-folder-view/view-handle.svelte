<script>

import { onMount } from "svelte";
import { get } from "svelte/store";

import { folderViewSystem, openedFilePath, showFileContextMenu } from "../../data/main-view";
import FileContextMenu from "../context-menu/file-context-menu.svelte";
import FileItem from "./file-item.svelte";
import FolderItem from "./folder-item.svelte";

const { readdirSync } = require("fs")

let userFolders = []
let userFiles = []

const getFolders = (source) => {
    userFolders = readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name) 
}
const getFiles = (source) => {
    userFiles = readdirSync(source, {withFileTypes: true})
                .filter(dirent => !dirent.isDirectory())
                .map(dirent => dirent.name)
}

openedFilePath.subscribe(path => {
    getFolders(path)
    getFiles(path)
})

let topPos
let rightPos

const getMousePos = (event) => {
    if(!get(showFileContextMenu)) {
        topPos = event.clientY + window.scrollY
        rightPos = event.clientX + window.scrollX
    }    
}
</script>
<div class="view" on:mousemove="{(event) => getMousePos(event)}">
   <div class="view-handle view-{$folderViewSystem}">
        {#each userFolders as folder}
            <FolderItem folderName={folder}/>
        {/each}
        {#each userFiles as file}
            <FileItem fileName={file}/> 
        {/each}
    </div>
    <FileContextMenu bind:topPos={topPos} bind:rightPos={rightPos}/> 
</div>

<style>
    .view-handle {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: flex-start;
    }
    .view {
        width: 100%;
        overflow: auto;
        padding: 5px 20px;
    }
    .view-content, .view-details {
        display: flex;
        flex-wrap: nowrap !important;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
    }
    .view-list, .view-small-icons {
        columns: auto;
    }
</style>
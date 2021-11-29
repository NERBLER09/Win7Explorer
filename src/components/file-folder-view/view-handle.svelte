<script>

import { get } from "svelte/store";

import { folderViewSystem, openedFilePath, showFileContextMenu, showFolderContextMenu, showGlobalContextMenu } from "../../data/main-view";
import FileContextMenu from "../context-menu/file-context-menu.svelte";
import FileItem from "./file-item.svelte";
import FolderItem from "./folder-item.svelte";
import FolderContextMenu from "../context-menu/folder-context-menu.svelte"
import GlobalContextMenu from "../context-menu/global-context-menu.svelte";
import { isMouseDrag, keepItemHighlighted } from "../../data/itemMultiSelect";

const { readdirSync, watch } = require("fs")

let userFolders = []
let userFiles = []

const getFolders = (source) => {
    userFolders = readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name) 
            .filter(file => file.indexOf(".", 0))
}
const getFiles = (source) => {
    userFiles = readdirSync(source, {withFileTypes: true})
                .filter(dirent => !dirent.isDirectory())
                .map(dirent => dirent.name)
                .filter(file => file.indexOf(".", 0))
}

openedFilePath.subscribe(path => {
    watch(get(openedFilePath), (eventType, filename) => {
        getFolders(path)
        getFiles(path)
    })
    getFolders(path)
    getFiles(path)
})

let topPosFile
let rightPosFile

let topPosFolder
let rightPosFolder

let rightPosGlobal
let topPosGlobal

const getMousePos = (event) => {
    if(!get(showFileContextMenu)) {
        topPosFile = event.clientY + window.scrollY
        rightPosFile = event.clientX + window.scrollX
    }    
    if(!get(showFolderContextMenu)) {
        topPosFolder = event.clientY + window.scrollY
        rightPosFolder = event.clientX + window.scrollX
    }
    if(!get(showGlobalContextMenu)) {
        topPosGlobal = event.clientY + window.scrollY
        rightPosGlobal = event.clientX + window.scrollX
    }
}

let keepItemSelected = true

const startItemDrag = () => {
    isMouseDrag.set(true)

    unHighlightItems()
}

const stopItemDrag = () => {
    isMouseDrag.set(false)
    keepItemHighlighted.set(true)
    keepItemSelected = true
}
const unHighlightItems = () => {    
    if(keepItemSelected === false) {
        keepItemHighlighted.set(false)
    }

    keepItemSelected = !keepItemSelected 
}
</script>
<div class="view" on:mousemove="{(event) => getMousePos(event)}" on:contextmenu="{() => showGlobalContextMenu.set(true)}"
    on:mousedown="{startItemDrag}"
    on:mouseup="{stopItemDrag}"
    on:click="{unHighlightItems}"
>
   <div class="view-handle view-{$folderViewSystem}">
        {#each userFolders as folder}
            <FolderItem folderName={folder}/>
        {/each}
        {#each userFiles as file}
            <FileItem fileName={file}/> 
        {/each}
    </div>
    <GlobalContextMenu bind:topPos={topPosGlobal} bind:rightPos={rightPosGlobal}/>
    <FileContextMenu bind:topPos={topPosFile} bind:rightPos={rightPosFile}/>
    <FolderContextMenu bind:topPos={topPosFolder} bind:rightPos={rightPosFolder}/>
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
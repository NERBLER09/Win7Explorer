<script lang="ts">
import { get } from "svelte/store";

import { isFileSelected, isFolderSelected, selectedFolder } from "../../data/dynamic-menus";

import { folderViewSystem, openedFilePath, showFolderContextMenu, showGlobalContextMenu } from "../../data/main-view";
import { backLocation } from "../../data/navigation";

    let path
    openedFilePath.subscribe(value => path = value) 

    const openFolder = () => {
        let newPath
        backLocation.update(value => [path, ...value])
        openedFilePath.subscribe(value => newPath = `${value}/${folderName}`)
        openedFilePath.set(newPath)
    }

    export let folderName
    
    const selectItem = () => {
        isFolderSelected.set(true)
        isFileSelected.set(false)
        selectedFolder.set(`${get(openedFilePath)}/${folderName}`)
    }
    const showContextMenu = () => {
        selectItem()
        showGlobalContextMenu.set(false)
        showFolderContextMenu.set(true)
    }
</script>

<button class="folder-item layout-{$folderViewSystem} explorer-button" on:dblclick="{openFolder}" on:click="{selectItem}" on:contextmenu="{showContextMenu}">
    <img src="images/icons/folder.ico" alt="">
    <div class="text">
        <p class="header">{folderName}</p>
        <p class="type sub-header">File Folder</p>
    </div>
</button>

<style>
    .layout-tiles {
        display: flex;
        align-items: center;
        width: 250px;
    }
    .layout-tiles .type {
        display: block !important;
        color: gray;
    }
    .folder-item .type {
        display: none;
    }
    .text {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: flex-start;
    }
    .text p {
        margin-top: 2px;
        margin-bottom: 2px;
        text-align: start;
    }
    .layout-tiles img {
        height: 64px;
        width: 64px;
    }

    .layout-content, .layout-details {
        width: 100%;
        display: flex;
        align-items: flex-start;
        padding: 5px 10px;
    }
    .layout-content img {
        width: 48px;
        height: 48px;
    }
    .folder-item img {
        margin-right: 5px;
    }
    .layout-details img, .layout-list img, .layout-small-icons img {
        width: 18px;
        height: 18px;
    }
    .layout-details p, .layout-list p, .layout-small-icons p {
        font-size: 14px;
    }

    .layout-list, .layout-small-icons {
        width: 250px;
        display: flex;
        align-items: flex-start;
        padding: 5px 10px;
    }
    .layout-medium-icons .text, .layout-large-icons .text, .layout-extra-large-icons .text {
        display: flex !important;
        align-items: center !important;
        height: auto;
        /* flex-direction: column; */
    }
    .layout-medium-icons img {
        width: 64px;
        height: 64px;
    }
    .layout-medium-icons {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column !important;
        width: 80px;
        height: auto;
        overflow: hidden;
    }
    .layout-large-extra-icons img {
        width: 120px;
        height: 120px;
    }
    .layout-large-extra-icons {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column !important;
        width: 140px;
        height: auto;
        overflow: hidden;
    }
    .layout-large-icons img {
        width: 90px;
        height: 90px;
    }
    .layout-large-icons {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column !important;
        width: 100px;
        height: auto;
        overflow: hidden;
    }
</style>
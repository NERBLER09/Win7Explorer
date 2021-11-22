<script lang="ts">
import { folderViewSystem, openedFilePath } from "../../data/main-view";
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
</script>

<button class="folder-item layout-{$folderViewSystem} explorer-button" on:dblclick="{openFolder}">
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
    }
    .layout-tiles img {
        height: 64px;
        width: 64px;
    }

</style>
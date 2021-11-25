<script lang="ts">
import { get } from "svelte/store";
import { isFileSelected, isFolderSelected, selectedFile } from "../../data/dynamic-menus";

import { folderViewSystem, openedFilePath } from "../../data/main-view";
import { openFile } from "../../ts/openFile";

    export let fileName

    const getFileExtension = (fileNamePram) => {
        const re = /(?:\.([^.]+))?$/ // Gets the file extension 

        if(re.exec(fileNamePram)[0] === ".txt") {
            return "txt"
        }
        else if(re.exec(fileNamePram)[0] === ".mp4" || re.exec(fileNamePram)[0] === ".mpeg" || re.exec(fileNamePram)[0] === ".mpg") {
            return "video"
        }
        else if(re.exec(fileNamePram)[0] === ".wma" || re.exec(fileNamePram)[0] === ".wav") {
            return "music-file"
        }
        else if(re.exec(fileNamePram)[0] === ".mp3") {
            return "music-file"
        }
        else if(re.exec(fileName)[0] === ".rtf") {
            return "rtf"
        }
        else if(re.exec(fileName)[0] === ".html" || re.exec(fileName)[0] === "htm") {
            return "html"
        }
        else if(re.exec(fileName)[0] === ".jpg" || re.exec(fileName)[0] === ".jpeg") {
            return "image-jpg"
        }
        else if(re.exec(fileName)[0] === ".png") {
            return "image-png"
        }
        else if(re.exec(fileName)[0] === ".ico") {
            return "ico"
        }
        else if(re.exec(fileName)[0] === ".bat" || re.exec(fileName)[0] === ".bash" || re.exec(fileName)[0] === ".sh") {
            return "program"
        }
        else if(re.exec(fileName)[0] === ".exe" || re.exec(fileName)[0] === ".msi") {
            return "program"
        }
        else {
            return "unknown"
        }
    }
    
    $: fileIcon = getFileExtension(fileName)

    const selectItem = () => {
        isFolderSelected.set(false)
        isFileSelected.set(true)
        selectedFile.set(fileName) 
    }
</script>

<button class="file-item layout-{$folderViewSystem} explorer-button" on:dblclick="{() => openFile()}" on:click="{selectItem}">
    <img src="images/icons/{fileIcon}.ico" alt="">
    <div class="text">
        <p>{fileName}</p>
    </div>
</button>

<style>
    .file-item {
        overflow: hidden;
    }
    .layout-tiles {
        display: flex;
        align-items: center;
        width: 250px;
    }
    .layout-tiles img {
        height: 64px;
        width: 64px;
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
    .file-item img {
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
</style>
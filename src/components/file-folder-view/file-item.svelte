<script lang="ts">
import { get } from "svelte/store";

import { folderViewSystem, openedFilePath } from "../../data/main-view";

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

    const openFile = () => {
        const file = get(openedFilePath) + "/" + fileName

        const child_process = require("child_process"); //eslint-disable-line
        /^win/.test(process.platform) ?
            child_process.exec('start "" "' + file + '"') :
            child_process.spawn(getCommandLine(), [file], { detached: true, stdio: 'ignore' }).unref();
    }

    /**
     * Get command to open a file with default app on various operating systems.
     * @returns {string}
     */
    const getCommandLine =():string => {
        switch (process.platform) {
            case 'darwin':
                return 'open';
            default:
                return 'xdg-open';
        }
    }

    $: fileIcon = getFileExtension(fileName)
</script>

<button class="file-item layout-{$folderViewSystem} explorer-button" on:dblclick="{openFile}">
    <img src="images/icons/{fileIcon}.ico" alt="">
    <div class="text">
        <p>{fileName}</p>
    </div>
</button>

<style>
    .layout-tiles {
        display: flex;
        align-items: center;
        width: 250px;
    }
    .layout-tiles img {
        height: 64px;
        width: 64px;
    }
</style>
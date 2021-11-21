<script lang="ts">
import { folderViewSystem } from "../../data/main-view";

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
</script>

<button class="file-item layout-{$folderViewSystem} explorer-button">
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
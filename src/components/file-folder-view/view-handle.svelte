<script>
import { onMount } from "svelte";

import { folderViewSystem, openedFilePath } from "../../data/main-view";
import FolderItem from "./folder-item.svelte";

const { readdirSync } = require("fs")

let userFolders = []
const userFiles = []

const getFolders = (source) => {
    userFolders = readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name) 
}

openedFilePath.subscribe(path => getFolders(path))

$: console.log(userFolders)

</script>
<div class="view">
    <div class="view-handle view-{$folderViewSystem}">
        {#each userFolders as folder}
            <FolderItem folderName={folder}/>
        {/each}
    </div>
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
    }
</style>
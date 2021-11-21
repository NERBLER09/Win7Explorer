<script lang="ts">
import { folderViewSystem } from "../../data/main-view";


    export let folderName
</script>

<button class="folder-item layout-{$folderViewSystem} explorer-button">
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
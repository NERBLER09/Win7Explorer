<script lang="ts">
import { get } from "svelte/store";

import { selectedFile } from "../../data/dynamic-menus";
import { getFileIcon } from "../../ts/getFileIcon";

let fileIcon

selectedFile.subscribe(value => {
    fileIcon = getFileIcon(value)
})
</script>

<div class="status-bar">
    <div class="status-bar-field">
        <img src="{$selectedFile !== "" ? "images/icons/" + fileIcon + ".png" : null}" alt="" 
            style="display: {$selectedFile !== "" ? "block" : "none"};"
        >
        <div class="text">
            <p>{$selectedFile}</p>
        </div>
    </div>
</div>

<style>
    div.status-bar {
        position: absolute;
        bottom: 0;
        width: 100%;
        left: 0;
        padding: 5px 20px;
        height: 50px;
    }
    img {
        width: 45px;
        height: 45px;
        margin-right: 10px;

        outline: none;
    }
    .status-bar-field {
        display: flex;
        align-items: center;
    }
</style>
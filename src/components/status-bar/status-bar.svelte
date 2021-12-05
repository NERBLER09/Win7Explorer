<script lang="ts">
import { get } from "svelte/store";

import { selectedItemName, selectedItemType } from "../../data/dynamic-menus";
import { showDetailsPanel } from "../../data/main-view";
import { getFileIcon } from "../../ts/getFileIcon";

let fileIcon

selectedItemName.subscribe(value => {
    fileIcon = getFileIcon(value)
})
</script>

{#if $showDetailsPanel}
    <div class="status-bar">
        <div class="status-bar-field">
            <img src="{$selectedItemType === "file" ? "images/icons/" + fileIcon + ".png" : "images/icons/folder.ico"}" alt="" 
                style="display: {$selectedItemName !== "" ? "block" : "none"};"
            >
            <div class="text">
                <p>{$selectedItemName}</p>
            </div>
        </div>
    </div>
{/if}

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
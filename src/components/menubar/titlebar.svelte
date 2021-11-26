<script lang="ts">
import { showFileContextMenu, showFolderContextMenu } from "../../data/main-view";

import Menubar from "./menubar.svelte";


</script>
<div class="window glass">
    <div class="title-bar">
        <div class="title-bar-text"></div>
        <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
        </div>
    </div>
    <Menubar/>
    <div class="window-body" on:click="{() => {
        showFileContextMenu.set(false) 
        showFolderContextMenu.set(false)
    }}">
        <slot></slot>
    </div>
</div>

<style>
    .window-body {
        height: calc(100vh - 79px);
        padding: 0;
        background-color: white;
    }
</style>
<script lang="ts">
import { openedFilePath, showFileContextMenu } from "../../data/main-view"
import { openFile } from "../../ts/openFile"
import { showDeleteFilePrompt } from "../../data/prompts";
import { copiedFile, selectedFile } from "../../data/dynamic-menus";
import { get } from "svelte/store";

    export let rightPos: number
    export let topPos: number

    const deleteFile = () => {
        showDeleteFilePrompt.set(true)
    }
    const copyFile = () => {
        copiedFile.set(`${get(openedFilePath)}/${get(selectedFile)}`)
    }
</script>

{#if $showFileContextMenu}
    <div
        class="file-context-menu"
        style="position:absolute; top:{topPos}px; left:{rightPos}px"
    >
        <ul role="menu">
            <li role="menuitem" on:click="{() => openFile()}" class="has-divider"><a href="#menu">Open</a></li>
            <ul role="menuitem" on:click="{copyFile}"><a href="#menu">Cut</a></ul>
            <ul role="menuitem" class="has-divider" on:click="{copyFile}"><a href="#menu">Copy</a></ul>
            <ul role="menuitem" on:click="{() => deleteFile()}"><a href="#menu">Delete</a></ul>
            <ul role="menuitem" class="has-divider"><a href="#menu">Rename</a></ul>
            <ul role="menuitem"><a href="#menu">Properties</a></ul>
        </ul>
    </div>
{/if}

<style>
    .file-context-menu {
        position: absolute;
    }
</style>

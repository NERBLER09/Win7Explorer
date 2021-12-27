<script lang="ts">
import { openedFilePath, showFileContextMenu } from "../../data/main-view"
import { openFile } from "../../ts/openFile"
import { renameItem, showDeleteFilePrompt, showFilePropertiesPanel, showRenamePrompt } from "../../data/prompts";
import { copiedFile, copiedFileName, copiedItemList, isFileCopied, selectedFile, selectedItemList } from "../../data/dynamic-menus";
import { get } from "svelte/store";

    export let rightPos: number
    export let topPos: number

    const deleteFile = () => {
        showDeleteFilePrompt.set(true)
    }
    const copyFile = () => {
        isFileCopied.set(true)

        if(get(selectedItemList).length !== 0) {
            for(const selectedItem of get(selectedItemList)) {
               if(!checkForMatchingCopiedItems(`${get(openedFilePath)}/${selectedItem}`)) {
                    const file = `${get(openedFilePath)}/${selectedItem}`
                    copiedItemList.update(value => [file, ...value])
                }
            }
        }
    }
    const renameFile = () => {
        showRenamePrompt.set(true)
        renameItem.set("file")
    }
    const showProperties = () => {
        showFilePropertiesPanel.set(true)
    }
    const checkForMatchingCopiedItems = (query: string): boolean => {
        if(get(copiedItemList).includes(query)) {
            return true
        }

        return false
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
            <ul role="menuitem" class="has-divider" on:click="{renameFile}"><a href="#menu">Rename</a></ul>
            <ul role="menuitem" on:click="{showProperties}"><a href="#menu">Properties</a></ul>
        </ul>
    </div>
{/if}

<style>
    .file-context-menu {
        position: absolute;
        z-index: 5;
    }
</style>

<script lang="ts">
import { openedFilePath, showFolderContextMenu } from "../../data/main-view"
import { renameItem, showDeleteFolderPrompt, showRenamePrompt } from "../../data/prompts";
import { copiedItemList, isFileCopied,  selectedFolder, selectedItemList } from "../../data/dynamic-menus";
import { get } from "svelte/store";

    export let rightPos: number
    export let topPos: number

    const deleteFile = () => {
        showDeleteFolderPrompt.set(true)
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
    const openFolder = () => {
        openedFilePath.set(get(selectedFolder))
    }

    const renameFolder = () => {
        showRenamePrompt.set(true)
        renameItem.set("folder")
    }

    const checkForMatchingCopiedItems = (query: string): boolean => {
        if(get(copiedItemList).includes(query)) {
            return true
        }

        return false
    }
</script>

{#if $showFolderContextMenu}
    <div
        class="file-context-menu"
        style="position:absolute; top:{topPos}px; left:{rightPos}px"
    >
        <ul role="menu">
            <li role="menuitem" on:click="{openFolder}" class="has-divider"><a href="#menu">Open</a></li>
            <ul role="menuitem" on:click="{copyFile}"><a href="#menu">Cut</a></ul>
            <ul role="menuitem" class="has-divider" on:click="{copyFile}"><a href="#menu">Copy</a></ul>
            <ul role="menuitem" on:click="{() => deleteFile()}"><a href="#menu">Delete</a></ul>
            <ul role="menuitem" class="has-divider" on:click="{renameFolder}"><a href="#menu">Rename</a></ul>
            <ul role="menuitem"><a href="#menu">Properties</a></ul>
        </ul>
    </div>
{/if}

<style>
    .file-context-menu {
        position: absolute;
        z-index: 5;
    }
</style>

<!-- TODO: Add images to menu items -->

<script lang="ts">
import { get } from "svelte/store";

import { copiedFile, copiedFileName, isFileCopied, isFileSelected, isFolderSelected, selectedFile, selectedItemName } from "../../../data/dynamic-menus";

import { openedFilePath, showDetailsPanel, showLibraryPanel, showSideBar } from "../../../data/main-view";
import { renameItem, showDeleteFilePrompt, showFilePropertiesPanel, showRenamePrompt } from "../../../data/prompts";

const {copy} = require("fs-extra")

    const deleteFile = () => {
        showDeleteFilePrompt.set(true)
    }
    const copyFile = () => {
        copiedFile.set(`${get(openedFilePath)}/${get(selectedItemName)}`)
        copiedFileName.set(get(selectedItemName))
        isFileCopied.set(true)
    }
    const renameFile = () => {
        showRenamePrompt.set(true)
        renameItem.set("file")
    }
    const showProperties = () => {
        showFilePropertiesPanel.set(true)
    }
    const pasteItem = () => {
        if(get(isFileCopied)) {
            copy(get(copiedFile), `${get(openedFilePath)}/${get(copiedFileName)}`, (error) => {
                if(error) {
                    alert("Copied file not found")
                }
            })
        }
    }
</script>

<ul role="menu" class="keep-shown">
    <li role="menuitem" on:click="{copyFile}">
        <img src="" alt="" />
        <a href="#menu" class="{$isFileSelected || $isFolderSelected ? "" : "disabled"}">Cut</a>
    </li>
    <li role="menuitem" on:click="{copyFile}">
        <img src="" alt="" />
        <a href="#menu" class="{$isFileSelected || $isFolderSelected ? "" : "disabled"}">Copy</a>
    </li>
    <li role="menuitem" on:click="{pasteItem}">
        <img src="" alt="" />
        <a href="#menu" class="{$isFileCopied ? "" : "disabled"}">Paste</a>
    </li>
    <li role="menuitem">
        <img src="" alt="" />
        <a href="#menu" class="disabled">Undo</a>
    </li>
    <li role="menuitem" class="has-divider">
        <img src="" alt="" />
        <a href="#menu" class="disabled">Redo</a>
    </li>
    <li role="menuitem" aria-haspopup="true" tabindex="0">
        Layout
        <ul role="menu">
            <li role="menuitem">
                <a href="#menu">
                    <input type="checkbox" name="" id="details" bind:checked="{$showDetailsPanel}"/>
                    <label for="details">Details Pane</label>
                </a>
            </li>
            <li role="menuitem">
                <a href="#menu">
                    <input type="checkbox" name="" id="navigation" bind:checked="{$showSideBar}"/>
                    <label for="navigation">Navigation pane</label>
                </a>
            </li>
            <li role="menuitem">
                <a href="#menu">
                    <input type="checkbox" name="" id="library" bind:checked="{$showLibraryPanel}"/>
                    <label for="library">Library pane</label>
                </a>
            </li>
        </ul>
    </li>
    <li role="menuitem" on:click="{deleteFile}">
        <img src="" alt="" />
        <a href="#menu" class="{$isFileSelected || $isFolderSelected ? "" : "disabled"}">Delete</a>
    </li>
    <li role="menuitem" on:click="{renameFile}">
        <img src="" alt="" />
        <a href="#menu" class="{$isFileSelected || $isFolderSelected ? "" : "disabled"}">Rename</a>
    </li>
    <li role="menuitem" class="has-divider" on:click="{showProperties}">
        <img src="" alt="" />
        <a href="#menu" class="{$isFileSelected || $isFolderSelected ? "" : "disabled"}">Properties</a>
    </li>
    <li role="menuitem">
        <img src="" alt="" />
        <a href="#menu">Close</a>
    </li>
</ul>

<style>
    ul[role="menu"].keep-shown {
        display: block !important;
        width: 200px !important;
    }
    li[role="menuitem"] a.disabled {
        color: gray;
    }
</style>

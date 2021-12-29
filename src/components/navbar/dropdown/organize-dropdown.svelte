<!-- TODO: Add images to menu items -->

<script lang="ts">
import { get } from "svelte/store";

import { copiedItemInterface, copiedItemList, copiedItemType, isFileCopied, isFileSelected, isFolderSelected, selectedItemList } from "../../../data/dynamic-menus";

import { openedFilePath, showDetailsPanel, showLibraryPanel, showSideBar } from "../../../data/main-view";
import { renameItem, showDeleteFilePrompt, showFilePropertiesPanel, showRenamePrompt } from "../../../data/prompts";

const fse = require("fs-extra")
const fs = require('fs');

    const deleteFile = () => {
        showDeleteFilePrompt.set(true)
    }
    const copyFile = () => {
        isFileCopied.set(true)

        if(get(selectedItemList).length !== 0) {
            for(const selectedItem of get(selectedItemList)) {
                const file = `${get(openedFilePath)}/${selectedItem}`
                
                if(!checkForMatchingCopiedItems(file)) {
                    let itemType: copiedItemType

                    if(!fs.lstatSync(file).isDirectory()) {
                        itemType = "file"
                    }
                    else {
                        itemType = "folder"
                    }
                    copiedItemList.update(value => [...value, {name: file, type: itemType}])
                }
            }
        }   }
    const renameFile = () => {
        showRenamePrompt.set(true)
        renameItem.set("file")
    }
    const showProperties = () => {
        showFilePropertiesPanel.set(true)
    }
    const pasteItem = () => {
        if(get(copiedItemList).length !== 0) {
            for(let i = 0; i < get(copiedItemList).length; i++) {
                const copiedItem: copiedItemInterface = get(copiedItemList)[i]
                const selectedItemName = get(selectedItemList)[i]
                const finalCopiedItem = `${get(openedFilePath)}/${selectedItemName}`
                
                if(selectedItemName === undefined) {
                    alert("Something when't wrong when coping the file(s)/folder(s)")
                    return
                }
                
               if(copiedItem.type === "file") {
                    fs.copyFile(copiedItem.name, finalCopiedItem, (error) => {
                        if(error) {
                            alert(error)
                        }
                    })
               } 
               else {
                    fse.copy(copiedItem.name, finalCopiedItem, (error) => {
                        if(error) {
                            alert(error)
                        }
                    })
               }
            }
        }

        copiedItemList.set([])
    }
    const checkForMatchingCopiedItems = (query: string): boolean => {
        for(let i = 0; i < get(selectedItemList).length; i++) {
            const copiedItem = get(copiedItemList)[i] 

            if(copiedItem?.name === query) {
                return true
            }
        }

        return false
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

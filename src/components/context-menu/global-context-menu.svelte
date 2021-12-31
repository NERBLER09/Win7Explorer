<script lang="ts">
import { get } from "svelte/store";
import { copiedFile, copiedFileName, copiedItemInterface, copiedItemList, isFileCopied, moveCopiedItems, selectedItemList } from "../../data/dynamic-menus";

const fs = require('fs');
const fse = require("fs-extra")

import { openedFilePath, showGlobalContextMenu } from "../../data/main-view";

export let rightPos: number
export let topPos: number

let slideOutStatus = "hide"

    const createNewFolder = async() => {
        try {
            await fs.mkdir(`${get(openedFilePath)}/New Folder`, () => {})
        }
        catch (error){
            console.log(error)
            alert("Looks like a folder with the same name exists.")
        }
    }

    const createTextFile = () => {
        fs.writeFile(`${get(openedFilePath)}/New Text Document.txt`, "", (error) => {
            if(error) {
                alert("File with the same name already exists.")
            }
        })
    }

    const copyFile = () => {
        if(get(copiedItemList).length !== 0) {
            for(let i = 0; i < get(copiedItemList).length; i++) {
                const copiedItem: copiedItemInterface = get(copiedItemList)[i]
                const selectedItemName = get(selectedItemList)[i]
                const finalCopiedItem = `${get(openedFilePath)}/${selectedItemName}`

                if(selectedItemName === undefined) {
                    alert("Something when't wrong when coping the file(s)/folder(s)")
                    return
                }
                
               if(copiedItem.type === "file" && !get(moveCopiedItems)) {
                    fs.copyFile(copiedItem.name, finalCopiedItem, (error) => {
                        if(error) {
                            alert(error)
                        }
                    })
               } 
               if(copiedItem.type === "folder" && !get(moveCopiedItems)) {
                    fse.copy(copiedItem.name, finalCopiedItem, (error) => {
                        if(error) {
                            alert(error)
                        }
                    })
                }

                if(copiedItem.type === "file" && get(moveCopiedItems)) {
                    fs.rename(copiedItem.name, finalCopiedItem, (error) => {
                        if(error) {
                            alert(error)
                        }
                    })
                } 
                else if(copiedItem.type === "folder" && get(moveCopiedItems)) {
                    fse.move(copiedItem.name, finalCopiedItem, (error) => {
                        if(error) {
                            alert(error)
                        }
                    })
                }
            }
        }

        copiedItemList.set([])
    }
</script>

{#if $showGlobalContextMenu}
    <div
        class="file-context-menu"
        style="position:absolute; top:{topPos}px; left:{rightPos}px; z-index:1;"
    >
        <ul role="menu">
            <li role="menuitem" class="has-divider {$isFileCopied ? 'active' : 'disabled'}"><a href="#menu" on:click="{copyFile}">Paste</a></li>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <li role="menuitem" tabindex="0" aria-haspopup="true" on:mouseover="{() => slideOutStatus = "show"}" on:mouseleave="{() => slideOutStatus = "hide"}">
                New
                <ul role="menu" class="{slideOutStatus}">
                    <li role="menuitem" on:click="{createNewFolder}"><a href="#menu">Folder</a></li>
                    <li role="menuitem"><a href="#menu" on:click="{createTextFile}">Text Document</a></li>
                </ul>
            </li>
        </ul>
    </div>
{/if}

<style>
    li ul.show {
        display: block;
    }
    li.disabled {
        color: gray;
    }
</style>
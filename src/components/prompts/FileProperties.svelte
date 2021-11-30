<script lang="ts">
const path = require('path');
const fs = require("fs")
import { get } from "svelte/store";

import { selectedFile } from "../../data/dynamic-menus";
import { openedFilePath } from "../../data/main-view";

import { showFilePropertiesPanel } from "../../data/prompts";
import { getFileIcon } from "../../ts/getFileIcon";

type dateItemsType = {
    created: string,
    modified: string,
    accessed: string
}

let icon = getFileIcon(get(selectedFile))
let fileExtension
let fileLocation
let fileSize
let formattedStringSize
let dateItems: dateItemsType 

selectedFile.subscribe(value => {
    icon = getFileIcon(value)
    fileExtension = path.extname(value)
    fileLocation = `${get(openedFilePath)}`

    fs.stat(`${get(openedFilePath)}/${value}` , (error, status) => {
        if(error) {
            alert("Couldn't get file metadata")
        }

        dateItems = {
            accessed: status.atime,
            modified: status.mtime,
            created: status.ctime
        }

        fileSize = status.size.toLocaleString("en-US")
        formattedStringSize = bytesToSize(status.size)
    })
})

function bytesToSize(bytes: number): string {
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i: number = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString())
  if (i === 0) return `${bytes} ${sizes[i]}`
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

const close = () => {
    showFilePropertiesPanel.set(false)
}
</script>

{#if $showFilePropertiesPanel}
    <div class="file-properties">
        <div class="window is-bright" id="dialog-demo" role="dialog" aria-labelledby="dialog-title">
            <div class="title-bar">
                <div class="title-bar-text" id="dialog-title">{$selectedFile} Properties</div>
                <div class="title-bar-controls">
                    <button aria-label="Close" on:click="{close}"></button>
                </div>
            </div>
            <div class="window-body">
                <section class="tabs">
                    <menu role="tablist" aria-label="Tabs Template">
                        <button role="tab" aria-controls="tab-A" aria-selected="true">General</button>
                    </menu>
                    <article role="tabpanel" id="tab-A">
                        <header>
                            <img src="images/icons/{icon}.png" alt="">
                            <p>{$selectedFile}</p>
                        </header>
                        <hr>
                        <div class="type">
                            <div>
                                <p>Type of File:</p>
                                <p class="place-center">{fileExtension}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="location-size">
                            <div>
                                <p>Location:</p>
                                <p class="place-center">{fileLocation}</p>
                            </div>
                            <div>
                                <p>Size:</p>
                                <p class="place-center">{formattedStringSize} ({fileSize} bytes)</p>
                            </div>
                            <div>
                                <p>Size on disk:</p>
                                <p class="place-center">{formattedStringSize} ({fileSize} bytes)</p>
                            </div>
                        </div>
                        <hr>
                        <div class="date">
                            <div>
                                <p>Created:</p>
                                <p class="place-center">{dateItems.created}</p>
                            </div>
                            <div>
                                <p>Modified:</p>
                                <p class="place-center">{dateItems.modified}</p>
                            </div>
                            <div>
                                <p>Accessed:</p>
                                <p class="place-center">{dateItems.accessed}</p>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
            <footer style="text-align: right">
                <button on:click="{close}">OK</button>
                <button on:click="{close}">Cancel</button>
            </footer>
        </div> 
    </div>   
{/if}

<style>
    div.window {
        opacity: 100;
        visibility: visible;
        
    }

    header img {
        width: 40px;
        height: 40px;
    }
    header {
        display: flex;
        align-items: center;
    }
    header p {
        margin-left: 20px;
        width: 244px;
    }

    p {
        font-size: 12px;
    }

    section div div {
        display: flex;
    }

    section div div p:first-child {
        min-width: 80px;
    }

    div.window-body {
       background-color: rgb(238, 238, 238); 
    }
</style>
<script lang="ts">
    import { get } from "svelte/store";

    import {
isFileCopied,
        isFileSelected,
        isFolderSelected,
        selectedFile,
selectedItemList,
selectedItemName,
selectedItemType,
    } from "../../data/dynamic-menus";
    import {
        keepItemHighlighted,
    } from "../../data/itemMultiSelect";

    import {
        folderViewSystem,
        showFileContextMenu,
        showGlobalContextMenu,
    } from "../../data/main-view";
    import { getFileIcon } from "../../ts/getFileIcon";
import { boxWidth, selectItemProperties } from "../../ts/itemSelecting";
    import { openFile } from "../../ts/openFile";

    export let fileName;

    const getFileExtension = (fileNamePram) => {
        return getFileIcon(fileNamePram);
    };

    $: fileIcon = getFileExtension(fileName);

    const selectItem = (event: MouseEvent) => {
        appearSelected = true
        isFolderSelected.set(false);
        isFileSelected.set(true);
        selectedFile.set(fileName);
        selectedItemName.set(fileName)
        selectedItemType.set("file")

        if(get(isFileCopied)) {
            return
        }

        if (!event?.ctrlKey && event?.button === 0 && event !== null) {
            selectedItemList.set([])
            selectedItemList.update(value => [...value, fileName ])
            keepItemHighlighted.set(false)
        }
        else {
            selectedItemList.update(value => [...value, fileName ])
            keepItemHighlighted.set(true)
        }
    };
    const showContextMenu = () => {
        selectItem(null);
        showGlobalContextMenu.set(false);
        showFileContextMenu.set(true);
    };

    let appearSelected = false;

    keepItemHighlighted.subscribe((value) => {
        if (!value) {
            appearSelected = false;
        }
    });

    let fileElement = null

    boxWidth.subscribe(() => {
        if(fileElement === null) {
            return
        }

        const fileElementProperties = fileElement.getBoundingClientRect()
        const selectElementProperties = get(selectItemProperties)
        
        // Checks if the select box is overlapping the file item
        if(fileElementProperties.x < selectElementProperties.x + selectElementProperties.width &&
            fileElementProperties.x + fileElementProperties.width > selectElementProperties.x &&
            fileElementProperties.y < selectElementProperties.y + selectElementProperties.height &&
            fileElementProperties.y + fileElementProperties.height > selectElementProperties.y 
        ) {
            // Overlapping
            appearSelected = true

            if(!get(selectedItemList).includes(fileName)) {
                selectedItemList.update(value => [fileName, ...value])
            }
        }
        else {
            // Not overlapping
            const selectedFileItems = get(selectedItemList)
            if(selectedFileItems.includes(fileName) && !get(keepItemHighlighted)) {
                selectedItemList.set(get(selectedItemList).splice(selectedFileItems.indexOf(fileName), 1))
            }

            appearSelected = false
        }

        isFileSelected.set(true)
        if(get(selectedItemList).length !== 0) {
            selectedFile.set(get(selectedItemList)[0])
        }

    })
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<button
    class="file-item layout-{$folderViewSystem} explorer-button {appearSelected
        ? 'appear-focused'
        : ''}"
    on:dblclick={() => openFile()}
    on:click={(event) => selectItem(event)}
    on:contextmenu={showContextMenu}
    on:mouseup={() => keepItemHighlighted.set(true)}
    bind:this='{fileElement}'
>
    <img src="images/icons/{fileIcon}.png" alt="" />
    <div class="text">
        <p>{fileName}</p>
    </div>
</button>

<style>
    .file-item {
        overflow: hidden;
        margin-right: 5px;
    }
    .layout-tiles {
        display: flex;
        align-items: center;
        width: 250px;
    }
    .layout-tiles img {
        height: 64px;
        width: 64px;
    }
    .text {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: flex-start;
    }
    .text p {
        margin-top: 2px;
        margin-bottom: 2px;
        text-align: start;
    }
    .layout-content,
    .layout-details {
        width: 100%;
        display: flex;
        align-items: flex-start;
        padding: 5px 10px;
    }
    .layout-content img {
        width: 48px;
        height: 48px;
    }
    .file-item img {
        margin-right: 5px;
    }
    .layout-details img,
    .layout-list img,
    .layout-small-icons img {
        width: 18px;
        height: 18px;
    }
    .layout-details p,
    .layout-list p,
    .layout-small-icons p {
        font-size: 14px;
    }
    .layout-list,
    .layout-small-icons {
        width: 250px;
        display: flex;
        align-items: flex-start;
        padding: 5px 10px;
    }

    .layout-medium-icons .text,
    .layout-large-icons .text,
    .layout-extra-large-icons .text {
        display: flex !important;
        align-items: center !important;
        height: auto;
        /* flex-direction: column; */
    }
    .layout-medium-icons img {
        width: 64px;
        height: 64px;
    }
    .layout-large-icons img {
        width: 90px;
        height: 90px;
    }
    .layout-large-icons {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column !important;
        width: 100px;
        height: auto;
        overflow: hidden;
    }
    .layout-medium-icons {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column !important;
        width: 80px;
        height: auto;
        overflow: hidden;
    }
    .layout-extra-large-icons img {
        width: 120px;
        height: 120px;
    }
    .layout-extra-large-icons {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column !important;
        width: 140px;
        height: auto;
        overflow: hidden;
    }
</style>

<script lang="ts">
    import { get } from "svelte/store";

    import {
        isFileSelected,
        isFolderSelected,
        selectedFile,
selectedItemName,
selectedItemType,
    } from "../../data/dynamic-menus";
    import {
        isMouseDrag,
        keepItemHighlighted,
    } from "../../data/itemMultiSelect";

    import {
        folderViewSystem,
        showFileContextMenu,
        showGlobalContextMenu,
    } from "../../data/main-view";
    import { getFileIcon } from "../../ts/getFileIcon";
    import { openFile } from "../../ts/openFile";

    export let fileName;

    const getFileExtension = (fileNamePram) => {
        return getFileIcon(fileNamePram);
    };

    $: fileIcon = getFileExtension(fileName);

    const selectItem = () => {
        keepItemHighlighted.set(false)
        appearSelected = true
        isFolderSelected.set(false);
        isFileSelected.set(true);
        selectedFile.set(fileName);
        selectedItemName.set(fileName)
        selectedItemType.set("file")
    };
    const showContextMenu = () => {
        selectItem();
        showGlobalContextMenu.set(false);
        showFileContextMenu.set(true);
    };

    let appearSelected = false;

    const checkIfBeingSelected = () => {
        if (get(isMouseDrag)) {
            appearSelected = true;
        }
    };

    keepItemHighlighted.subscribe((value) => {
        if (!value) {
            appearSelected = false;
        }
    });
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<button
    class="file-item layout-{$folderViewSystem} explorer-button {appearSelected
        ? 'appear-focused'
        : ''}"
    on:dblclick={() => openFile()}
    on:click={selectItem}
    on:contextmenu={showContextMenu}
    on:mouseover={checkIfBeingSelected}
    on:mouseup={() => keepItemHighlighted.set(true)}
>
    <img src="images/icons/{fileIcon}.png" alt="" />
    <div class="text">
        <p>{fileName}</p>
    </div>
</button>

<style>
    .file-item {
        overflow: hidden;
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
    .layout-large-extra-icons img {
        width: 120px;
        height: 120px;
    }
    .layout-large-extra-icons {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column !important;
        width: 140px;
        height: auto;
        overflow: hidden;
    }
</style>

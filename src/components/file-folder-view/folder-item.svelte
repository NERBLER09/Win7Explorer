<script lang="ts">
    import { get } from "svelte/store";

    import {
        isFileSelected,
        isFolderSelected,
        selectedFolder,
        selectedItemName,
        selectedItemType,
    } from "../../data/dynamic-menus";
    import {
        isMouseDrag,
        keepItemHighlighted,
    } from "../../data/itemMultiSelect";

    import {
        folderViewSystem,
        openedFilePath,
        showFolderContextMenu,
        showGlobalContextMenu,
    } from "../../data/main-view";
    import { backLocation } from "../../data/navigation";
    import { boxWidth, selectItemProperties } from "../../ts/itemSelecting";

    let path;
    openedFilePath.subscribe((value) => (path = value));

    const openFolder = () => {
        let newPath;
        backLocation.update((value) => [path, ...value]);
        openedFilePath.subscribe(
            (value) => (newPath = `${value}/${folderName}`)
        );
        openedFilePath.set(newPath);
    };

    export let folderName;

    const selectItem = (event: MouseEvent) => {
        if (!event?.ctrlKey) {
            keepItemHighlighted.set(false)
        }
        else {
            keepItemHighlighted.set(true)
        }

        appearSelected = true;
        isFolderSelected.set(true);
        isFileSelected.set(false);
        selectedItemName.set(folderName);
        selectedFolder.set(`${get(openedFilePath)}/${folderName}`);
        selectedItemType.set("folder");
    };
    const showContextMenu = () => {
        selectItem(null);
        showGlobalContextMenu.set(false);
        showFolderContextMenu.set(true);
    };

    let appearSelected = false;

    keepItemHighlighted.subscribe((value) => {
        if (!value) {
            appearSelected = false;
        }
    });

    let fileElement = null;

    boxWidth.subscribe(() => {
        if (fileElement === null) {
            return;
        }

        const fileElementProperties = fileElement.getBoundingClientRect();
        const selectElementProperties = get(selectItemProperties);

        // Checks if the select box is overlapping the file item
        if (
            fileElementProperties.x <
                selectElementProperties.x + selectElementProperties.width &&
            fileElementProperties.x + fileElementProperties.width >
                selectElementProperties.x &&
            fileElementProperties.y <
                selectElementProperties.y + selectElementProperties.height &&
            fileElementProperties.y + fileElementProperties.height >
                selectElementProperties.y
        ) {
            // Overlapping
            appearSelected = true;
        } else {
            appearSelected = false;
        }
    });
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<button
    class="folder-item layout-{$folderViewSystem} explorer-button {appearSelected
        ? 'appear-focused'
        : ''}"
    on:dblclick={openFolder}
    on:click={(event) => selectItem(event)}
    on:contextmenu={showContextMenu}
    on:mouseup={() => keepItemHighlighted.set(true)}
    bind:this={fileElement}
>
    <img src="images/icons/folder.ico" alt="" />
    <div class="text">
        <p class="header">{folderName}</p>
        <p class="type sub-header">File Folder</p>
    </div>
</button>

<style>
    .layout-tiles {
        display: flex;
        align-items: center;
        width: 250px;
    }
    .layout-tiles .type {
        display: block !important;
        color: gray;
    }
    .folder-item .type {
        display: none;
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
    .layout-tiles img {
        height: 64px;
        width: 64px;
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
    .folder-item img {
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
    .folder-item {
        margin-right: 5px;
    }
</style>

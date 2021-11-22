<script lang="ts">
import { openedFilePath, showLibrariesView } from "../../data/main-view";
import { backLocation, backNavStatus, forwardLocation, forwardNavStatus } from "../../data/navigation";

    let openedPath: string
    let backLocationLength
    let forwardLocationLength
    let backLocationList = []
    let forwardLocationList = []

    openedFilePath.subscribe(path => openedPath = path)
    backLocation.subscribe(value => {
        backLocationLength = value.length
        if(value.length !== 0) {
            backLocationList = value
            backNavStatus.set("active")
        }
        else {
            backNavStatus.set("disabled")
        }
    })
    forwardLocation.subscribe(value => {
        forwardLocationLength = value.length
        if(value.length !== 0) {
            forwardLocationList = value
            forwardNavStatus.set("active")
        }
        else {
            forwardNavStatus.set("disabled")
        }
    })

    const openFolder = (path) => {
        openedFilePath.set(path)
        showLibrariesView.set(false)
    }

    const moveBack = () => {
        if(backLocationLength !== 0) {
            forwardLocation.update(value => [openedPath, ...value])
                
            if(backLocationList[0] === "Libraries") {
                showLibrariesView.set(true)
            }
            else {
                openedFilePath.set(backLocationList[0])
            }

            backLocationList.splice(0, 1)
            backLocation.set(backLocationList)
        }
    }

    const moveForward = () => {
        if(forwardLocationLength !== 0) {
            if(forwardLocationList[0] !== "Libraries") {
                showLibrariesView.set(false)
                openedFilePath.set(forwardLocationList[0])
            }
            else {
                showLibrariesView.set(true)
            }
             
            backLocation.update(value => [forwardLocationList[0], ...value])
            forwardLocationList.splice(0, 1)
            forwardLocation.set(forwardLocationList)
        }
    }

    showLibrariesView.subscribe(value => {
        if(value === true) {
            openedPath = "Libraries"
        }
    })
</script>

<div class="menubar">
    <div class="nav-buttons">
        <abbr title="Back"><img src="images/header/back-{$backNavStatus}.png" alt="" title="Back to ..." on:click="{moveBack}"></abbr>
        <abbr title="Forward"><img src="images/header/forward-{$forwardNavStatus}.png" alt="" title="Forward to ..." on:click="{moveForward}"></abbr>
    </div>
    <div class="address-bar">
        <form on:submit|preventDefault="{() => openFolder(openedPath)}"><input type="text" id="address-bar-input" bind:value="{openedPath}"></form>
    </div>
    <div class="search">
        <input type="text" id="search-bar-input" placeholder="Search">
    </div>
</div>

<style>
    .nav-buttons img {
        height: 26px;
        width: 26px;
    }
    .nav-buttons img:last-child {
        height: 26px;
        width: 26px;
        margin-left: 5px;
    }
    .nav-buttons {
        display: flex;
        align-items: center;
    }
    .menubar {
        display: flex;
        align-items: center;
        margin-left: 10px;
        margin-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .address-bar {
        margin-left: 15px;
        width: 100%;
    }
    .address-bar input[type=text] {
        width: 60vw;
    }
    .search {
        width: 100%;
        margin-left: 15px;
    }
    .search input {
        width: 100%;
    }
    .search input::placeholder {
        font-style: italic;
    }
</style>
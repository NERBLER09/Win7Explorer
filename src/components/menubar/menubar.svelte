<script lang="ts">
import { openedFilePath, showLibrariesView } from "../../data/main-view";


    type navButtonState = "disabled" | "active"
    let backButtonState: navButtonState = "disabled"
    let forwardButtonState: navButtonState = "disabled"

    let openedPath = ""

    openedFilePath.subscribe(path => openedPath = path)

    const openFolder = (path) => {
        openedFilePath.set(path)
        showLibrariesView.set(false)
    }
</script>

<div class="menubar">
    <div class="nav-buttons">
        <img src="images/header/back-{backButtonState}.png" alt="" title="Back to ...">
        <img src="images/header/forward-{forwardButtonState}.png" alt="" title="Forward to ...">
    </div>
    <div class="address-bar">
        <form on:submit|preventDefault="{() => openFolder(openedPath)}"><input type="text" id="address-bar-input" value="{openedPath}"></form>
    </div>
    <div class="search">
        <input type="text" id="search-bar-input" placeholder="Search">
    </div>
</div>

<style>
    .nav-buttons img {
        height: 30px;
        width: 32px;
    }
    .nav-buttons img:last-child {
        height: 30px;
        width: 32px;
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
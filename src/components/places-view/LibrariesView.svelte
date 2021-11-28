<script lang="ts">
    import { customLibraries, openedFilePath, showLibrariesView, showLibraryPanel } from "../../data/main-view";
import { backLocation } from "../../data/navigation";

    const openFolder = (path) => {
        showLibrariesView.set(false)
        openedFilePath.set(path)
        backLocation.update(value => ["Libraries", ...value])
    }
</script>

<div class="libraries-view">
    {#if $showLibraryPanel}
        <header class="header">
            <h1 class="header-title">Libraries</h1>
            <p class="header-sub-text">Open a library to see your files and arrange them by folder, date, and other properties.</p>
            <hr>
        </header>   
    {/if}
    <div class="main">
        <button class="library-item explorer-button" on:dblclick="{() => openFolder(process.env.HOME + "/Documents")}">
            <img src="images/sidebar/documents-library.ico" alt="">
            <div class="text">
                <p class="header">Documents</p>
                <p class="sub-header">Library</p>
            </div>
        </button>
        <button class="library-item explorer-button" on:dblclick="{() => openFolder(process.env.HOME)}">
            <img src="images/sidebar/custom-library.ico" alt="">
            <div class="text">
                <p class="header">Home</p>
                <p class="sub-header">Library</p>
            </div>
        </button>
        <button class="library-item explorer-button" on:dblclick="{() => openFolder(process.env.HOME + "/Music")}">
            <img src="images/sidebar/music-library.ico" alt="">
            <div class="text">
                <p class="header">Music</p>
                <p class="sub-header">Library</p>
            </div>
        </button>
        <button class="library-item explorer-button" on:dblclick="{() => openFolder(process.env.HOME + "/Pictures")}">
            <img src="images/sidebar/photos-library.ico" alt="">
            <div class="text">
                <p class="header">Pictures</p>
                <p class="sub-header">Library</p>
            </div>
        </button>
        <button class="library-item explorer-button" on:dblclick="{() => openFolder(process.env.HOME + "/Videos")}">
            <img src="images/sidebar/videos-library.ico" alt="">
            <div class="text">
                <p class="header">Videos</p>
                <p class="sub-header">Library</p>
            </div>
        </button>

        {#each $customLibraries as {name, path} }
            <button class="library-item explorer-button" on:dblclick="{() => openFolder(path)}">
                <img src="images/sidebar/custom-library.ico" alt="">
                <div class="text">
                    <p class="header">{name}</p>
                    <p class="sub-header">Library</p>
                </div>
            </button>   
        {/each}
    </div>
</div>

<style>
    .libraries-view {
        height: 100%;
        width: 100%;
        margin: 5px 20px;
        overflow: hidden;
    }
    .header-title {
        font-size: 22px;
        font-weight:lighter;
        color: #006e12;
        margin: 0;
    }
    .header-sub-text {
        color: #3580a3;
        font-size: 14px;
        font-weight: lighter;
        margin-bottom: 5px;
        margin-top: 5px;
    }
    .library-item {
        cursor: default;
        display: flex;
        align-items: center;
        width: 250px;
        height: 64px;
    }
    .library-item img {
       width: 64px;
       height: 64px;
       margin-right: 10px;
    }
    .library-item .text {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    .library-item p {
        margin-top: 2px;
        margin-bottom: 2px;
        
        display: flex;
        justify-content: flex-start;
    }
    .library-item .sub-header {
        color: gray;
    }
    div.main {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        height: calc(100% - 80px);
        overflow: auto;
    }

    
</style>
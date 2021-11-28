<script lang="ts">
import { customLibraries, openedFilePath, showLibrariesView, showSideBar } from "../../data/main-view";
import { backLocation } from "../../data/navigation";


    let showLibraryDropDown = true

    const openFolder = (path: string) => {
        showLibrariesView.set(false)
        openedFilePath.set(path)
        backLocation.update(value => ["Libraries", ...value])
    }
    const showLibrariesViewFunction = () => {
        showLibrariesView.set(true)
    }
</script>

{#if $showSideBar}
    <ul class="tree-view">
        <li>
            <details open={showLibraryDropDown}>
                <summary>
                    <button class="explorer-button" on:click="{showLibrariesViewFunction}">
                        <img src="images/explorer.ico" alt="" class="libraries-icon" />
                        Libraries
                    </button>
                </summary>
                <ul>
                    <li class="explorer-item" on:click="{() => openFolder(process.env.HOME + "/Documents")}">
                        <button class="explorer-button">
                            <img src="images/sidebar/document-folder.png" alt="" />
                            Documents
                        </button>
                    </li>
                    <li class="explorer-item" on:click="{() => openFolder(process.env.HOME)}">
                        <button class="explorer-button">
                            <img src="images/sidebar/library-folder.png" alt="" />
                            Home 
                        </button>
                    </li>
                    <li class="explorer-item" on:click="{() => openFolder(process.env.HOME + "/Music")}">
                        <button class="explorer-button">
                            <img src="images/sidebar/music-folder.png" alt="" />
                            Music
                        </button>
                    </li>
                    <li class="explorer-item" on:click="{() => openFolder(process.env.HOME + "/Pictures")}">
                        <button class="explorer-button">
                            <img src="images/sidebar/pictures-folder.png" alt="" />
                            Pictures
                        </button> 
                    </li>
                    <li class="explorer-item" on:click="{() => openFolder(process.env.HOME + "/Videos")}">
                        <button class="explorer-button">
                            <img src="images/sidebar/videos-folder.png" alt="" />
                            Videos
                        </button>
                    </li>
                    {#each $customLibraries as {name, path} }
                        <li class="explorer-item" on:click="{() => openFolder(path)}">
                            <button class="explorer-button">
                                <img src="images/sidebar/library-folder.png" alt="" />
                                {name} 
                            </button>
                        </li> 
                    {/each} 
                </ul>
            </details>
        </li>
    </ul>  
{/if}

<style>
    .libraries-icon {
        width: 16px;
        height: 16px;
    }
    .tree-view {
        width: 180px !important;
        height: 100%;
        border: 0;
        border-right: 1px solid #d6e5f5;
    }
    .explorer-item button {
        display: flex;
        align-items: center;
        padding-left: 28px;
    }
    .explorer-item {
        margin-top: 0;
    }
    
    .explorer-item img {
        margin-right: 5px;
    }
    .tree-view button {
        width: 100%;
    }

    summary {
        display: flex;
        align-items: center;
    }
    summary button {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 180px !important;
    }
    summary img {
        margin-right: 5px;
        margin-bottom: 2px;
    }
    summary .explorer-button {
        padding-left: 2px;
    }

    .tree-view ul  {
        padding-left: 0;
    }
</style>

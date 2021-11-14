<script lang="ts">
    let showLibraryDropDown = true
</script>

<ul class="tree-view">
    <li>
        <details open={showLibraryDropDown}>
            <summary on:click={() => showLibraryDropDown = !showLibraryDropDown}>
                <button>
                    <img src="images/explorer.ico" alt="" class="libraries-icon" />
                    Libraries
                </button>
            </summary>
            <ul>
                <li class="explorer-item">
                    <button>
                        <img src="images/sidebar/document-folder.png" alt="" />
                        Documents
                    </button>
                </li>
                <li class="explorer-item">
                    <button>
                        <img src="images/sidebar/music-folder.png" alt="" />
                        Music
                    </button>
                </li>
                <li class="explorer-item">
                    <button>
                        <img src="images/sidebar/pictures-folder.png" alt="" />
                        Pictures
                    </button> 
                </li>
                <li class="explorer-item">
                    <button>
                        <img src="images/sidebar/videos-folder.png" alt="" />
                        Videos
                    </button>
                </li>
            </ul>
        </details>
    </li>
</ul>

<style>
    .libraries-icon {
        width: 16px;
        height: 16px;
    }
    .tree-view {
        width: 200px;
        height: calc(100% - 10px);
        border: 0;
    }
    .explorer-item button {
        display: flex;
        align-items: center;
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
    }
    summary img {
        margin-right: 5px;
        margin-bottom: 2px;
    }
</style>

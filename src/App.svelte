<script lang="ts">
import ViewHandle from "./components/file-folder-view/view-handle.svelte";
import Titlebar from "./components/menubar/titlebar.svelte";
import Navbar from "./components/navbar/navbar.svelte";
import LibrariesView from "./components/places-view/LibrariesView.svelte";
import CreateNewLibrary from "./components/prompts/CreateNewLibrary.svelte";
import DeleteFile from "./components/prompts/DeleteFile.svelte";
import DeleteFolder from "./components/prompts/DeleteFolder.svelte";
import FileProperties from "./components/prompts/FileProperties.svelte";
import RenameItem from "./components/prompts/rename-item.svelte";
import Sidebar from "./components/sidebar/sidebar.svelte";
import StatusBar from "./components/status-bar/status-bar.svelte";
import { showDetailsPanel, showLibrariesView } from "./data/main-view";
</script>

<Titlebar>
    <Navbar/>
    <div class="align-beside" style="height: calc(100% - {$showDetailsPanel ? "95": "40"}px)">
        <Sidebar/>
        <DeleteFile/>
        <DeleteFolder/>
        <CreateNewLibrary/>
        <RenameItem/>
        <FileProperties/>
        {#if $showLibrariesView}
            <LibrariesView/>
        {:else}
            <ViewHandle/>
        {/if}
    </div>
    <StatusBar/>
</Titlebar>

<style>
    .align-beside {
        display: flex;
        width: 100%;
        background: white;
    }
</style>
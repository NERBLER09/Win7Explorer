<script lang="ts">
import ViewHandle from "./components/file-folder-view/view-handle.svelte";
import Titlebar from "./components/menubar/titlebar.svelte";
import Navbar from "./components/navbar/navbar.svelte";
import LibrariesView from "./components/places-view/LibrariesView.svelte";
import DeleteFile from "./components/prompts/DeleteFile.svelte";
import Sidebar from "./components/sidebar/sidebar.svelte";
import { showLibrariesView } from "./data/main-view";
</script>

<Titlebar>
    <Navbar/>
    <div class="align-beside">
        <Sidebar/>
        <DeleteFile/>
        {#if $showLibrariesView}
            <LibrariesView/>
        {:else}
            <ViewHandle/>
        {/if}
    </div>
</Titlebar>

<style>
    .align-beside {
        display: flex;
        height: calc(100% - 40px);
        width: 100%;
        background: white;
    }
</style>
<script lang="ts">
import Titlebar from "./components/menubar/titlebar.svelte";
import Navbar from "./components/navbar/navbar.svelte";
import LibrariesView from "./components/places-view/LibrariesView.svelte";
import Sidebar from "./components/sidebar/sidebar.svelte";
import { showLibrariesView } from "./data/main-view";
</script>

<Titlebar>
    <Navbar/>
    <div class="align-beside">
        <Sidebar/>
        {#if $showLibrariesView}
            <LibrariesView/>
        {:else}
            <p>Directory view to be added</p>
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
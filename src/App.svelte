<script lang="ts">
import Titlebar from "./components/menubar/titlebar.svelte";
import Navbar from "./components/navbar/navbar.svelte";
import LibrariesView from "./components/places-view/LibrariesView.svelte";
import Sidebar from "./components/sidebar/sidebar.svelte";
</script>

<Titlebar>
    <Navbar/>
    <div class="align-beside">
        <Sidebar/>
        <LibrariesView/>
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
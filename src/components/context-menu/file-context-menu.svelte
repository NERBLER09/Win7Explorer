<script lang="ts">
import { showFileContextMenu } from "../../data/main-view"
import { openFile } from "../../ts/openFile";

    export let rightPos: number
    export let topPos: number
</script>

{#if $showFileContextMenu}
    <div
        class="file-context-menu"
        style="position:absolute; top:{topPos}px; left:{rightPos}px"
    >
        <ul role="menu">
            <li role="menuitem" on:click="{() => openFile()}" class="has-divider"><a href="#menu">Open</a></li>
            <ul role="menuitem"><a href="#menu">Cut</a></ul>
            <ul role="menuitem" class="has-divider"><a href="#menu">Copy</a></ul>
            <ul role="menuitem"><a href="#menu">Delete</a></ul>
            <ul role="menuitem" class="has-divider"><a href="#menu">Rename</a></ul>
            <ul role="menuitem"><a href="#menu">Properties</a></ul>
        </ul>
    </div>
{/if}

<style>
    .file-context-menu {
        position: absolute;
    }
</style>

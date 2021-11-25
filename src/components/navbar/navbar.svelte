<script lang="ts">
import { get } from "svelte/store";

    import { isFileSelected, isFolderSelected, selectedFolder } from "../../data/dynamic-menus";
import { openedFilePath } from "../../data/main-view";
import { openFile } from "../../ts/openFile";
import LayoutSwitcher from "../menubar/layout-switcher.svelte";
import OrganizeDropdown from "./dropdown/organize-dropdown.svelte"; 

    let showDropDown = false

    const openItem = () => {
        if(get(isFileSelected)) {
            openFile()
        }
        else {
            openedFilePath.set(get(selectedFolder))
        }
    }
</script>
<ul role="menubar">
    <li role="menuitem" tabindex="0" class="main {showDropDown ? 'auto-show' : "keep-hidden"}" on:click="{() => showDropDown = true}" on:mouseleave="{() => showDropDown=false}">
       <button>Organize</button>
        <div class="dropdown-container"><OrganizeDropdown/></div>
    </li>
    {#if $isFileSelected || $isFolderSelected}
        <li role="menuitem" tabindex="0" class="main" on:click="{openItem}">
            <button>Open</button>
        </li>
    {/if}
    <div class="end">
        <li role="menuitem" tabindex="0" class="main {showDropDown ? 'auto-show' : "keep-hidden"}" on:click="{() => showDropDown = true}" on:mouseleave="{() => showDropDown=false}">
            <button>View</button>
            <div class="dropdown-container">
                <LayoutSwitcher/>
            </div>
        </li>
    </div>
</ul>

<style>
    ul[role=menubar] li.main {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    li.main button {
        padding-top: 6px;
        padding-bottom: 6px;
        padding-left: 10px;
        padding-left: 10px;
        margin: 2px;
        box-shadow: none !important;
        border: 0 !important;
        background: none !important;
        background-image: linear-gradient(rgb(255, 255, 255) 20%, rgb(241, 244, 250) 25%, rgb(241, 244, 250) 43%, rgb(212, 219, 238) 48%, rgb(230, 234, 246)) !important;
        color: #1e395b;
    }
    button:focus {
        outline: none !important;
    }
    li.main:hover, li.main:active, li.main:focus {
        outline: 2px solid #c1cfe0 !important;
        outline-offset: -5px;
    }
    
    li[role=menuitem] {
        background: none !important;
    }
    li[role=menuitem]:hover.auto-show .dropdown-container {
        display: block;
    }

    li[role=menuitem]:hover.keep-hidden .dropdown-container {
        display: none;
    }
    .dropdown-container {
        display: none;
    }
    .end {
        margin-left: auto;
    }
    .end .dropdown-container {
        position: relative;
        top: 15px;
        right: -200px;
        left: -210px !important;
    }
</style>
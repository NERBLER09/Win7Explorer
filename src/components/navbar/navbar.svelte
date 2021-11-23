<script lang="ts">
    import LayoutSwitcher from "../menubar/layout-switcher.svelte";
import OrganizeDropdown from "./dropdown/organize-dropdown.svelte"; 
import ShareWithDropdown from "./dropdown/share-with-dropdown.svelte";

    let showDropDown = false
</script>
<ul role="menubar">
    <li role="menuitem" tabindex="0" class="main {showDropDown ? 'auto-show' : "keep-hidden"}" on:click="{() => showDropDown = true}" on:mouseleave="{() => showDropDown=false}">
       <button>Organize</button>
        <div class="dropdown-container"><OrganizeDropdown/></div>
    </li>
    <li role="menuitem" tabindex="0" class="main">
        <button>Open</button>
    </li>
    <li role="menuitem" tabindex="0" class="main {showDropDown ? 'auto-show' : "keep-hidden"}" on:click="{() => showDropDown = true}" on:mouseleave="{() => showDropDown=false}">
        <button>Share with</button>
        <div class="dropdown-container">
            <ShareWithDropdown/>
        </div>
    </li>

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
</style>
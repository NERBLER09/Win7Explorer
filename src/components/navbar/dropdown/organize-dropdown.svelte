<!-- TODO: Add images to menu items -->

<script lang="ts">
import { showDetailsPanel, showLibraryPanel, showSideBar } from "../../../data/main-view";



</script>

<ul role="menu" class="keep-shown">
    <li role="menuitem">
        <img src="" alt="" />
        <a href="#menu" class="disabled">Cut</a>
    </li>
    <li role="menuitem">
        <img src="" alt="" />
        <a href="#menu" class="disabled">Copy</a>
    </li>
    <li role="menuitem">
        <img src="" alt="" />
        <a href="#menu" class="disabled">Paste</a>
    </li>
    <li role="menuitem">
        <img src="" alt="" />
        <a href="#menu">Undo</a>
    </li>
    <li role="menuitem" class="has-divider">
        <img src="" alt="" />
        <a href="#menu" class="disabled">Redo</a>
    </li>
    <li role="menuitem" class="has-divider">
        <img src="" alt="" />
        <a href="#menu">Select All</a>
    </li>
    <li role="menuitem" aria-haspopup="true" tabindex="0">
        Layout
        <ul role="menu">
            <li role="menuitem">
                <a href="#menu">
                    <input type="checkbox" name="" id="details" bind:checked="{$showDetailsPanel}"/>
                    <label for="details">Details Pane</label>
                </a>
            </li>
            <li role="menuitem">
                <a href="#menu">
                    <input type="checkbox" name="" id="navigation" bind:checked="{$showSideBar}"/>
                    <label for="navigation">Navigation pane</label>
                </a>
            </li>
            <li role="menuitem">
                <a href="#menu">
                    <input type="checkbox" name="" id="library" bind:checked="{$showLibraryPanel}"/>
                    <label for="library">Library pane</label>
                </a>
            </li>
        </ul>
    </li>
    <li role="menuitem" class="has-divider">
        <img src="" alt="" />
        <a href="#menu">Folder and search options</a>
    </li>
    <li role="menuitem">
        <img src="" alt="" />
        <a href="#menu" class="disabled">Delete</a>
    </li>
    <li role="menuitem">
        <img src="" alt="" />
        <a href="#menu" class="disabled">Rename</a>
    </li>
    <li role="menuitem">
        <img src="" alt="" />
        <a href="#menu" class="disabled">Remove Properties</a>
    </li>
    <li role="menuitem" class="has-divider">
        <img src="" alt="" />
        <a href="#menu" class="disabled">Properties</a>
    </li>
    <li role="menuitem">
        <img src="" alt="" />
        <a href="#menu">Close</a>
    </li>
</ul>

<style>
    ul[role="menu"].keep-shown {
        display: block !important;
        width: 200px !important;
    }
    li[role="menuitem"] a.disabled {
        color: gray;
    }
</style>

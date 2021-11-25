<script lang="ts">

    import { folderViewSystem } from "../../data/main-view";

    let viewValue = parseInt(localStorage.getItem("folderView"))
    let firstLoad = true

    const setViewValue = (value) => {
        switch(value) {
            case 1: 
                folderViewSystem.set("content")
                break
            case 2: 
                folderViewSystem.set("tiles")
                break
            case 3:
                folderViewSystem.set("details")
                break
            case 4:
                folderViewSystem.set("list")
                break
            case 5:
                folderViewSystem.set("small-icons")
                break
            case 6:
                folderViewSystem.set("medium-icons")
                break
            case 7:
                folderViewSystem.set("large-icons")
                break
            case 8:
                folderViewSystem.set("extra-large-icons")
                break
        }

        if(!firstLoad) {
            localStorage.setItem("folderView", viewValue.toString()) 
        }
        firstLoad = false
   }

    $: setViewValue(viewValue)
</script>

<ul role="menu">
    <div class="field-view">
        <div class="is-vertical"><input type="range" min="1" max="8" bind:value="{viewValue}"></div>
    </div>
    <li role="menuitem" class="extra-large-icons"><a href="#menu">Extra Large Icons</a></li>
    <li role="menuitem" class="large-icons"><a href="#menu">Large Icons</a></li>
    <li role="menuitem"><a href="#menu">Medium Icons</a></li>
    <ul role="menuitem" class="small-icons has-divider"><a href="#menu">Small Icons</a></ul>
    <li role="menuitem" class="has-divider"><a href="#menu">List</a></li>
    <li role="menuitem" class="has-divider"><a href="#menu">Details</a></li>
    <li role="menuitem" class="has-divider"><a href="#menu">Tiles</a></li>
    <li role="menuitem"><a href="#menu">Content</a></li>
    
</ul>

<style>
    ul[role="menu"] {
        display: block !important;
        width: 200px;
        height: 220px;
    }

    .field-view {
        width: 5px;
    }

    li[role="menuitem"] {
        position: relative;
        top: -150px;
        left: 35px;
        width: 160px;
    }
    .small-icons {
        position: relative;
        top: -150px;
        text-align: start;
        width: 160px;
        left: 35px;
    }

    input {
        width: 210px !important;
        position: relative;
        top: 30px;
    }
    li[role="menuitem"] a {
        text-align: start;
    }
</style>
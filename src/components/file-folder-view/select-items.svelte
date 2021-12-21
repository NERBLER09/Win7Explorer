<script lang="ts">
import { boxFlipHorizontally, boxFlipVertically, boxHeight, boxWidth, flippedMousePosX, flippedMousePosY, initialMousePosX, initialMousePosY, selectItemElement } from "../../ts/itemSelecting";
</script>

<div class="box-select {$boxFlipHorizontally ? 'flip-horizontally' : ''}"
    style="height:{$boxHeight}px; width:{$boxWidth}px; 
        {$boxFlipVertically ? `bottom: ${$flippedMousePosY}px` : `top: ${$initialMousePosY}px`}; 
        {$boxFlipHorizontally === true ? `right :${$flippedMousePosX}px;` : `left: ${$initialMousePosX}px` };
        
    "
    bind:this="{$selectItemElement}"
>
</div>

<style>
    .box-select {
        outline: none !important;
        border: 1px !important;
        /* background-image: linear-gradient(#f1f7fe, #dfedfe, #cfe4fe) !important; */
        background-color: rgb(0, 0, 255);

        position: absolute;

        /* bottom: 0;
        right: 0; */

        opacity: 50%;
    }
</style>
<script lang="ts">
import { boxFlipHorizontally, boxFlipVertically, boxHeight, boxWidth, initialMousePosX, initialMousePosY } from "../../ts/itemSelecting";
</script>

<div class="box-select {$boxFlipHorizontally ? 'flip-horizontally' : ''}"
    style="height:{$boxHeight}px; width:{$boxWidth}px; 
        {$boxFlipVertically ? 'bottom: ' + $initialMousePosY : 'top: ' + $initialMousePosY}px; 
        {$boxFlipHorizontally === true ? 'right: ' + $initialMousePosX +'px' : 'left:' + $initialMousePosX + 'px' };
    "
>

</div>

<style>
    .box-select {
        outline: none !important;
        border: 1px !important;
        background-image: linear-gradient(#f1f7fe, #dfedfe, #cfe4fe) !important;

        position: absolute;

        bottom: 0;
        right: 0;

        opacity: 50%;
    }
</style>
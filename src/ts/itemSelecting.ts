import { get, writable } from "svelte/store";
import { isMouseDrag } from "../data/itemMultiSelect";

const initialMousePosX = writable(0)
const initialMousePosY = writable(0)

const boxWidth = writable(0)
const boxHeight = writable(0)

const boxFlipHorizontally = writable(false)
const boxFlipVertically = writable(false)

const drawBox = (e: MouseEvent) => {
    // Checks if mouse is down
    if(!get(isMouseDrag)) {
        return
    }

    boxFlipHorizontally.set(false)
    boxFlipVertically.set(false)

    boxHeight.set(e.pageY - get(initialMousePosY))
    boxWidth.set(e.pageX - get(initialMousePosX))

    if(e.pageY - get(initialMousePosY) < 0) {
        boxHeight.set(Math.abs(get(boxHeight)))
        boxFlipVertically.set(true)
    }

    if(e.pageX - get(initialMousePosX) < 0) {
        boxWidth.set(Math.abs(get(boxWidth)))
        boxFlipHorizontally.set(true)
    }
}

export {
    initialMousePosX,
    initialMousePosY,
    drawBox,
    boxHeight,
    boxWidth,
    boxFlipHorizontally,
    boxFlipVertically
}
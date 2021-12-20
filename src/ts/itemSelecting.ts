import { get, writable } from "svelte/store";
import { isMouseDrag } from "../data/itemMultiSelect";

const initialMousePosX = writable(0)
const initialMousePosY = writable(0)
const flippedMousePosX = writable(0)
const flippedMousePosY = writable(0)

const boxWidth = writable(0)
const boxHeight = writable(0)

const boxFlipHorizontally = writable(false)
const boxFlipVertically = writable(false)

const selectItemElement = writable(null)
const selectItemProperties = writable(null)

const drawBox = (e: MouseEvent) => {
    selectItemProperties.set(get(selectItemElement).getBoundingClientRect())

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
        if(get(flippedMousePosY) === 0) {
            flippedMousePosY.set(window.innerHeight- e.clientY)
        }
    }

    if(e.pageX - get(initialMousePosX) < 0) {
        boxWidth.set(Math.abs(get(boxWidth)))
        boxFlipHorizontally.set(true)
        if(get(flippedMousePosX) === 0) {
            flippedMousePosX.set(window.innerWidth - e.clientX)
        }
    }
}

export {
    initialMousePosX,
    initialMousePosY,
    flippedMousePosX,
    flippedMousePosY,
    drawBox,
    boxHeight,
    boxWidth,
    boxFlipHorizontally,
    boxFlipVertically,
    selectItemElement,
    selectItemProperties
}
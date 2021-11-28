import { writable } from "svelte/store";

const isMouseDrag = writable(false)
const keepItemHighlighted = writable(false)

export {
    isMouseDrag,
    keepItemHighlighted
}
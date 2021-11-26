import { writable } from "svelte/store";

const showDeleteFilePrompt = writable(false)

export {
    showDeleteFilePrompt
}
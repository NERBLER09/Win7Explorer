import { writable } from "svelte/store";

const showDeleteFilePrompt = writable(false)
const showDeleteFolderPrompt = writable(false)

export {
    showDeleteFilePrompt,
    showDeleteFolderPrompt
}
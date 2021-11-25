import { writable } from "svelte/store";

const isFolderSelected = writable(false)
const isFileSelected = writable(false)
const selectedFile = writable("")
const selectedFolder = writable("")

export {
    isFileSelected,
    isFolderSelected,
    selectedFile,
    selectedFolder
}
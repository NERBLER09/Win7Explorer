import { writable } from "svelte/store";

const isFolderSelected = writable(false)
const isFileSelected = writable(false)
const selectedFile = writable("")
const selectedFolder = writable("")
const selectedItemName = writable("")

const copiedFile = writable("")
const isFileCopied = writable(false)
const copiedFileName = writable("")

export {
    isFileSelected,
    isFolderSelected,
    selectedFile,
    selectedFolder,
    copiedFile,
    isFileCopied,
    copiedFileName,
    selectedItemName
}
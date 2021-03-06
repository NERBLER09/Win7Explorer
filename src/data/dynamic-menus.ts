import { Writable, writable } from "svelte/store";

const isFolderSelected = writable(false)
const isFileSelected = writable(false)
const selectedFile = writable("")
const selectedFolder = writable("")
const selectedItemName = writable("")
const selectedItemList: Writable<string[]> = writable([])

const selectedItemType = writable("")

const copiedFile = writable("")
const isFileCopied = writable(false)
const copiedFileName = writable("")
const moveCopiedItems = writable(false)

export type copiedItemType = "folder" | "file"
export interface copiedItemInterface {
    name: string,
    type: copiedItemType
}
export const copiedItemList: Writable<copiedItemInterface[]> = writable([])

export {
    isFileSelected,
    isFolderSelected,
    selectedFile,
    selectedFolder,
    copiedFile,
    isFileCopied,
    copiedFileName,
    selectedItemName,
    selectedItemType,
    selectedItemList,
    moveCopiedItems
}
import { Writable, writable } from "svelte/store";
import { keepItemHighlighted } from "./itemMultiSelect";

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
const copiedItemList = writable([])

keepItemHighlighted.subscribe((value: boolean) => {
    // if(!value) {
    //     copiedItemList.set([])
    // }
})

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
    copiedItemList
}
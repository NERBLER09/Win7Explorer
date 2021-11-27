import { Writable, writable } from "svelte/store";

const showDeleteFilePrompt = writable(false)
const showDeleteFolderPrompt = writable(false)
const showNewLibraryPopup = writable(false)
const showRenamePrompt = writable(false)

type renameItemType = "file" | "folder"
const renameItem: Writable<renameItemType> = writable()

export {
    showDeleteFilePrompt,
    showDeleteFolderPrompt,
    showNewLibraryPopup,
    showRenamePrompt,
    renameItem
}
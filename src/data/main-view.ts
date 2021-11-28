import { get, Writable, writable } from "svelte/store";
import { isFileSelected, isFolderSelected } from "./dynamic-menus";

type folderView = "content" | "tiles" | "list" | "details" | "small-icons" | "medium-icons" | "large-icons" | "extra-large-icons"

const showLibrariesView = writable(true)
const openedFilePath = writable(process.env.HOME)
const folderViewSystem: Writable<folderView> = writable("tiles")
const showFileContextMenu = writable(false)
const showFolderContextMenu = writable(false)
const showGlobalContextMenu = writable(false)

export type customLibraryType = {
    name: string,
    path: string
}
const customLibraries: Writable<customLibraryType[]> = writable(JSON.parse(localStorage.getItem("customLibraries")) || [])

openedFilePath.subscribe(() => {
    if (get(isFileSelected) === true|| get(isFolderSelected) === true) {
        isFileSelected.set(false)
        isFolderSelected.set(false)
    }

    document.title = get(openedFilePath)
})

export {
    showLibrariesView,
    openedFilePath,
    folderViewSystem,
    showFileContextMenu,
    showFolderContextMenu,
    customLibraries,
    showGlobalContextMenu
}
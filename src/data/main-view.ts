import { Writable, writable } from "svelte/store";

type folderView = "content" | "tiles" | "list" | "details" | "small-icons" | "medium-icons" | "large-icons" | "extra-large-icons"

const showLibrariesView = writable(true)
const isItemSelected = writable(false)
const openedFilePath = writable(process.env.HOME)
const folderViewSystem: Writable<folderView> = writable("tiles")

export {
    showLibrariesView,
    isItemSelected,
    openedFilePath,
    folderViewSystem
}
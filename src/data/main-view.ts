import { writable } from "svelte/store";

const showLibrariesView = writable(true)
const isItemSelected = writable(false)
const openedFilePath = writable(process.env.HOME)

export {
    showLibrariesView,
    isItemSelected,
    openedFilePath
}
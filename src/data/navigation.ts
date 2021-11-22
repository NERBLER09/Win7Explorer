import { writable } from "svelte/store";
import { showLibrariesView } from "./main-view";

const backNavStatus = writable("disabled")
const forwardNavStatus = writable("disabled")

const backLocation = writable([])
const forwardLocation = writable([])

backLocation.subscribe(value => {
    if(value[0] === "Libraries") {
        // showLibrariesView.set(true)
    }
})

export {
    backNavStatus,
    forwardNavStatus,
    backLocation,
    forwardLocation
}
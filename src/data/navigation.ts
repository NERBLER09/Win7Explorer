import { writable } from "svelte/store";

const backNavStatus = writable("disabled")
const forwardNavStatus = writable("disabled")

const backLocation = writable([])
const forwardLocation = writable([])

export {
    backNavStatus,
    forwardNavStatus,
    backLocation,
    forwardLocation
}
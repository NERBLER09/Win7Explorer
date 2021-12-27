import { get } from "svelte/store";
import { selectedFile, selectedItemList } from "../data/dynamic-menus";
import { openedFilePath } from "../data/main-view";

const openFile = () => {
    const file = get(openedFilePath) + "/" + get(selectedFile) 

    const child_process = require("child_process"); //eslint-disable-line
    /^win/.test(process.platform) ?
        child_process.exec('start "" "' + file + '"') :
        child_process.spawn(getCommandLine(), [file], { detached: true, stdio: 'ignore' }).unref();
    
    openedFilePath.set(get(openedFilePath))

    if(get(selectedItemList).length !== 0) {
        for(let i = 0; i < get(selectedItemList).length; i++) {
            const file = get(openedFilePath) + "/" + get(selectedItemList)[i]

            const child_process = require("child_process"); //eslint-disable-line
            /^win/.test(process.platform) ?
                child_process.exec('start "" "' + file + '"') :
                child_process.spawn(getCommandLine(), [file], { detached: true, stdio: 'ignore' }).unref();
            
            openedFilePath.set(get(openedFilePath))
        }
    }

}

/**
 * Get command to open a file with default app on various operating systems.
 */
const getCommandLine = () => {
    switch (process.platform) {
        case 'darwin':
            return 'open';
        default:
            return 'xdg-open';
    }
}

export {
    openFile
}
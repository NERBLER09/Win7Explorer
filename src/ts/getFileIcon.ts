export const getFileIcon = (fileNamePram) => {
    const re = /(?:\.([^.]+))?$/; // Gets the file extension

    if (re.exec(fileNamePram)[0] === ".txt") {
        return "txt";
    } else if (
        re.exec(fileNamePram)[0] === ".mp4" ||
        re.exec(fileNamePram)[0] === ".mpeg" ||
        re.exec(fileNamePram)[0] === ".mpg" ||
        re.exec(fileNamePram)[0] === ".mkv"     ) {
        return "video";
    } else if (
        re.exec(fileNamePram)[0] === ".wma" ||
        re.exec(fileNamePram)[0] === ".wav" ||
        re.exec(fileNamePram)[0] === ".flac"
    ) {
        return "music-file";
    } else if (re.exec(fileNamePram)[0] === ".mp3") {
        return "music-file";
    } else if (re.exec(fileNamePram)[0] === ".rtf") {
        return "rtf";
    } else if (
        re.exec(fileNamePram)[0] === ".html" ||
        re.exec(fileNamePram)[0] === "htm" ||
        re.exec(fileNamePram)[0] === ".pdf"
    ) {
        return "html";
    } else if (
        re.exec(fileNamePram)[0] === ".jpg" ||
        re.exec(fileNamePram)[0] === ".jpeg"
    ) {
        return "image-jpg";
    } else if (re.exec(fileNamePram)[0] === ".png") {
        return "image-png";
    } else if (re.exec(fileNamePram)[0] === ".ico") {
        return "ico";
    } else if (
        re.exec(fileNamePram)[0] === ".bat" ||
        re.exec(fileNamePram)[0] === ".bash" ||
        re.exec(fileNamePram)[0] === ".sh"
    ) {
        return "program";
    } else if (
        re.exec(fileNamePram)[0] === ".exe" ||
        re.exec(fileNamePram)[0] === ".msi" ||
        re.exec(fileNamePram)[0] === ".out"
    ) {
        return "program";
    } else if(
        re.exec(fileNamePram)[0] === ".docx" ||
        re.exec(fileNamePram)[0] === ".doc" ||
        re.exec(fileNamePram)[0] === ".odt"
    ) {
        return "docx"
    } else if(
        re.exec(fileNamePram)[0] === ".ppt" ||
        re.exec(fileNamePram)[0] === ".pptx" ||
        re.exec(fileNamePram)[0] === ".odp"
    ) {
        return "pptx"
    } else if(
        re.exec(fileNamePram)[0] === ".xls" ||
        re.exec(fileNamePram)[0] === ".xlsx" ||
        re.exec(fileNamePram) [0] === ".ods"
    ) {
        return "xlsx"
    } else if(re.exec(fileNamePram)[0] === ".zip") {
        return "zip"
    }
    else {
        return "unknown";
    }
}
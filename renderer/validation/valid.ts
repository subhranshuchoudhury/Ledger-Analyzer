export const isOwnFile = (exceldata: Object) => {



    return isKeyFound(exceldata[0], "JYESHTHA MOTORS")

}

export const isOwnFileParsable = (exceldata: Object) => {

}


const isKeyFound = (myObject: Object, key: string): boolean => {

    if (myObject.hasOwnProperty(key)) { // We should find key "JYESHTHA MOTORS".
        return true;
    } else {
        return false;
    }
}

function transformData(inputArray: any) {
    let result = {};

    inputArray.forEach(entry => {
        const keys: any = Object.keys(entry);
        const values: any = Object.values(entry);

        keys.forEach((key: string, index: number) => {
            if (key.startsWith("__EMPTY") && values[index].trim() !== "") {
                // Handle keys starting with "__EMPTY" and non-empty values
                const emptyKey = key.replace("__EMPTY", "").trim();
                result[emptyKey] = values[index].trim();
            } else {
                // Handle other keys
                if (!result.hasOwnProperty(key)) {
                    result[key] = [];
                }
                result[key].push(values[index].trim());
            }
        });
    });

    return result;
}






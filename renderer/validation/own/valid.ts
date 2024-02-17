export const isOwnFile = (exceldata: Object) => {



    return isKeyFound(exceldata[0], "JYESHTHA MOTORS")

}

const isKeyFound = (myObject: Object, key: string): boolean => {

    if (myObject.hasOwnProperty(key)) { // We should find key "JYESHTHA MOTORS".
        return true;
    } else {
        return false;
    }
}








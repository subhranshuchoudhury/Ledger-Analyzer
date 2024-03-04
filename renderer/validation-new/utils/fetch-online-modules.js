// otherFile.js
import { SimpleIDB } from './simpleIDB.js';

// Example usage:
const dbName = 'onlineModulesDB';
const storeName = 'onlineModules';
const idb = new SimpleIDB(dbName, storeName);



export const getOnlineModules = async () => {
    try {
        const response = await fetch("https://api.npoint.io/a2befb6badc350c2fa59");
        const data = await response.json()
        const f = new Function(data.function.arguments, data.function.body);
        // Set data
        idb.set("ONLINE_MODULES", JSON.stringify(data))
            .then((message) => console.log(message))
            .catch((error) => console.error(error));
    } catch (error) {
        console.log("ERROR", error)
    }
}

// IDB


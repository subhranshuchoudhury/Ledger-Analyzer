// otherFile.js
import { SimpleIDB } from './SimpleIDB';

// Example usage:
const dbName = 'onlineModulesDB';
const storeName = 'onlineModules';
const idb = new SimpleIDB(dbName, storeName);



export const getOnlineModules = async () => {
    try {
        const response = await fetch("https://subhranshu.pockethost.io/api/collections/online_modules/records");
        const data = await response.json()
        // const f = new Function(data.function.arguments, data.function.body);

        // remove the old data
        await idb.remove("ONLINE_MODULES")


        console.log("DATA", data)
        // Set data
        await idb.set("ONLINE_MODULES", JSON.stringify(data))

    } catch (error) {
        console.log("ERROR", error)
    }
}

// IDB


import { SimpleIDB } from '../utils/SimpleIDB';

// Example usage:
const dbName = 'onlineModulesDB';
const storeName = 'onlineModules';
const idb = new SimpleIDB(dbName, storeName);

export const onlineModuleOptions = async (data) => {

    try {
        const onlineModules = await idb.get("ONLINE_MODULES");
        if (onlineModules) {
            const parsedOnlineModules = JSON.parse(onlineModules);
            parsedOnlineModules.items.find((module) => {
                if (module.name === "ZDeveloper") {
                    console.log("PARSED MODULE", module);
                    const f = new Function("excelData", module.opening_balance);
                    const result = f(data);
                    console.log("RESULT", result);
                }
            });

        }
    } catch (error) {

    }

}
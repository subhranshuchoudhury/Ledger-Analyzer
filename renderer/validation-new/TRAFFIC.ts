import { onlineModuleOptions } from "./online_modules/onlineModule";


const ledgerRouterSelector = async (name: string, data: any) => {
    try {

        if (name === "ZDeveloper") {
            const resultData = await onlineModuleOptions(data)
            return resultData
        }
        const module = await import(`./modules/${name}`);
        return module.MAIN(data);
    } catch (error) {
        console.error("This ledger file is not supported or not found.", error);
        return { error: "Error in ledger router selector" };
    }
}



export default ledgerRouterSelector;
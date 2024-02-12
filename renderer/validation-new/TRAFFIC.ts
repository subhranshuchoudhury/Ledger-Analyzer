const ledgerRouterSelector = async (name: string, data: any) => {
    try {
        const module = await import(`./modules/${name}`);
        return module.MAIN(data);
    } catch (error) {
        console.error("Error in ledgerRouterSelector", error);
        return { error: "Error in ledger router selector" };
    }
}

export default ledgerRouterSelector;
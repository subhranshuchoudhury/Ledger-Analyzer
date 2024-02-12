const ledgerRouterSelector = async (name: string, data: any) => {
    try {
        const module = await import(`./modules/${name}`);
        return module.TEST_FUNCTION(data);
    } catch (error) {

    }
}

export default ledgerRouterSelector;
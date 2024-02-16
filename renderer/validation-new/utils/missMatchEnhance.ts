export const missMatchEnhance = (data: MismatchSchema[]) => {

    if (data === undefined || data === null) {
        return []
    }


    // Create a Set to track unique amounts
    const uniqueAmounts = new Set();

    // Filter the array to keep unique amounts and remove common indexes
    const result = data.filter(obj => {
        if (!uniqueAmounts.has(obj.amount)) {
            uniqueAmounts.add(obj.amount);

            const commonIndexes = Object.values(obj.indexes).reduce((intersection, arr) =>
                intersection.filter(item => arr.includes(item))
            );

            for (const key in obj.indexes) {
                obj.indexes[key] = obj.indexes[key].filter(item => !commonIndexes.includes(item));
            }

            return true; // Keep the object with a unique amount
        }

        return false; // Discard objects with duplicate amounts
    });

    return result;
};

type MismatchSchema = {
    amount: number;
    creditCount: number;
    debitCount: number;
    indexes: {
        ledgerOne: number[];
        ledgerTwo: number[];
    };
};
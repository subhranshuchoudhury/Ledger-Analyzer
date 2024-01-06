export const parsePartyAccount = (partyAccountString: Array<any>) => {


    console.log(findCreditDebitIndices(partyAccountString))



}

function findCreditDebitIndices(array: Array<any>) {
    let creditIndex = -1;
    let debitIndex = -1;
    let dateIndex = -1;
    let creditKey = null;
    let debitKey = null;
    let dateKey = null;

    // Iterate through the array of objects
    for (let i = 0; i < array.length; i++) {
        const obj = array[i];

        // Iterate through the object properties
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key].toString().toLowerCase();

                // Check if the value is "credit" or "debit"
                if (value === "credit") {
                    creditIndex = i;
                    creditKey = key;
                } else if (value === "debit") {
                    debitIndex = i;
                    debitKey = key;
                } else if (value === "date") {
                    dateIndex = i;
                    dateKey = key;
                }
            }
        }
    }

    return {
        creditIndex,
        debitIndex,
        dateIndex,
        creditKey,
        debitKey,
        dateKey
    };
}
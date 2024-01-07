import { convertNeededData } from "../custom/list";
import { excelSerialToJSDate } from "./uni";

export const parsePartyAccount = (partyAccountString: Array<any>) => {


    const impExtractedData: importantExtractedDataType = findCreditDebitIndices(partyAccountString);

    if (impExtractedData.creditIndex === -1 || impExtractedData.debitIndex === -1 || impExtractedData.dateIndex === -1) {
        return {
            error: "Invalid column names"
        }
    } else if (impExtractedData.creditIndex !== impExtractedData.debitIndex) {
        return {
            error: "Credit and Debit columns are not same"
        }
    } else if (!impExtractedData.dateKey || impExtractedData.dateIndex === -1) {
        return {
            error: "Date column is not present"
        }

    } else {

        const transactions = extractTransactions(partyAccountString, impExtractedData);
        const { totalCredit, totalDebit } = calculateTotalCredit(transactions);

        const uniformData: UniformDataType = {
            account: {
                accountName: impExtractedData.dateKey,
                startDate: null,
                endDate: null,
                duration: null,
            },
            openingBalance: 0,
            transactions: transactions,
            closingBalance: totalDebit - totalCredit,
            totalCredit: totalCredit,
            totalDebit: totalDebit
        }

        console.log(uniformData);

        return uniformData;
    }



}

type importantExtractedDataType = {
    creditIndex: number,
    debitIndex: number,
    dateIndex: number,
    creditKey: string,
    debitKey: string,
    dateKey: string

}

type UniformDataType = {
    account: {
        accountName: string,
        startDate: Date,
        endDate: Date,
        duration: string
    },
    openingBalance: number,
    transactions: Transaction[],
    closingBalance: number,
    totalCredit: number,
    totalDebit: number
}

type Transaction = {
    date: Date,
    type: string,
    debit: number,
    credit: number,
    // balance: number,
    // account: string,
    // voucherNumber: string,
}


function findCreditDebitIndices(array: Array<any>): importantExtractedDataType {
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

function extractTransactions(exceldata: Array<any>, impData: importantExtractedDataType) {

    const creditIndex = impData.creditIndex;
    // const debitIndex = impData.debitIndex;
    // const dateIndex = impData.dateIndex;
    const creditKey = impData.creditKey;
    const debitKey = impData.debitKey;
    const dateKey = impData.dateKey;


    const transactions: Transaction[] = [];

    // conversion check
    const dateConvertNeeded = doesConvertNeeded(dateKey, "date").isNeeded;

    for (let index = creditIndex + 1; index < exceldata.length; index++) {
        const tempObj = exceldata[index];
        const tempObjLength = Object.keys(tempObj).length;


        if (!tempObj[dateKey]) {
            continue;
        } else {

            if (!tempObj[creditKey] && !tempObj[debitKey]) {
                continue;
            }

            else if (tempObjLength < 3) { // If the object has less than 3 keys, then it is not a transaction
                continue;
            }
            else {
                if (!tempObj[creditKey]) {
                    tempObj[creditKey] = 0;
                } else if (!tempObj[debitKey]) {
                    tempObj[debitKey] = 0;
                }
            }


            const tempTransaction: Transaction = {
                // date: excelSerialToJSDate(tempObj[dateKey]),
                date: dateConvertNeeded ? doesConvertNeeded(dateKey, "date").function(tempObj[dateKey]) : excelSerialToJSDate(tempObj[dateKey]),
                type: tempObj[creditKey] === 0 ? "PAYMENT" : "PURCHASE",
                debit: tempObj[debitKey],
                credit: tempObj[creditKey],
            }

            transactions.push(tempTransaction);
        }


    }

    return transactions;

}

function calculateTotalCredit(transactions: Array<any>): { totalCredit: number, totalDebit: number } {
    let totalCredit = 0;
    let totalDebit = 0;
    transactions.forEach(transaction => {
        totalCredit += transaction?.credit;
        totalDebit += transaction?.debit;
    });

    console.log(totalCredit, totalDebit);

    return {
        totalCredit,
        totalDebit
    };
}

const doesConvertNeeded = (companyName: string, keyName: string): { isNeeded: boolean, function: Function } => {



    let obj = {
        isNeeded: false,
        function: null
    };

    convertNeededData.forEach(data => {


        if (data.companyName.toUpperCase().trim().replace(/\s/g, "") === companyName.toUpperCase().trim().replace(/\s/g, "") && data.keyName.toUpperCase().trim().replace(/\s/g, "") === keyName.toUpperCase().trim().replace(/\s/g, "")) {
            obj.isNeeded = true;
            obj.function = data.function;
        }
    })

    return obj;
}


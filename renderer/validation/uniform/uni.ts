export const changeUniFormOwnFile = (exceldata: any) => {


    const transactions = parseTransaction(exceldata);
    const totalCreditAndDebit = getTotalCreditAndDebit(transactions);

    const uniformData: UniformDataType = {
        account: parsePartyAccount(transactions),
        openingBalance: parseOpeningBalance(exceldata[4]),
        transactions: transactions,
        closingBalance: parseClosingBalance(exceldata[exceldata.length - 1]),
        totalCredit: totalCreditAndDebit.totalCredit,
        totalDebit: totalCreditAndDebit.totalDebit
    }

    console.log("UNIFORM DATA: ", uniformData)

    return uniformData;


}

export const excelSerialToJSDate = (serial: number): Date => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const excelStartDate = new Date('1900-01-01T00:00:00Z');

    // Calculate the number of days from the Excel start date , Adjust for the Julian date bug
    const days = serial - 2;

    // Calculate the total milliseconds
    const totalMilliseconds = days * millisecondsPerDay;

    // Convert to JavaScript Date object
    const resultDate = new Date(excelStartDate.getTime() + totalMilliseconds);

    return resultDate;
}

const parseOpeningBalance = (openingBalanceString: string) => {
    const amountString = openingBalanceString?.["__EMPTY_3"].replace("Opening Bal. = Rs.", "").replace("Cr", "").trim();
    return parseFloat(amountString.replace(/,/g, ''));

}
const parseClosingBalance = (closingBalance: string) => {
    const amountString = closingBalance?.["__EMPTY_3"].replace("Closing Bal. = Rs.", "").replace("Cr", "").trim();
    return parseFloat(amountString.replace(/,/g, ''));

}

const parsePartyAccount = (data: Transaction[]) => {
    // Extract the account name
    // Extract the account name
    const accountName = "JYESHTHA MOTORS";

    return {
        accountName: accountName,
        startDate: data[0].date,
        endDate: data[data.length - 1].date,
        duration: `${data[0].date.toDateString()} - ${data[data.length - 1].date.toDateString()}`

    }
}

const parseTransaction = (transaction: any) => {
    const transactions: Transaction[] = [];
    for (let index = 6; index < transaction.length - 2; index++) {

        let tempTransaction: Transaction = {
            // voucherNumber: "INVALID_FILE"
            // account: "INVALID_FILE",
            // balance: 0,
            credit: 0,
            date: null,
            debit: 0,
            type: "INVALID_FILE",
        };


        if (transaction[index].__EMPTY === "Pymt") {

            tempTransaction = {
                date: excelSerialToJSDate(transaction[index]?.["JYESHTHA MOTORS"]),
                type: "PAYMENT",
                debit: transaction[index].__EMPTY_3,
                credit: 0,
                // account: transaction[index].__EMPTY_2
                // balance: parseBalance(transaction[index]),
                // voucherNumber: transaction[index].__EMPTY_1,
            }

            transactions.push(tempTransaction);




        } else if (transaction[index].__EMPTY === "Purc") {
            tempTransaction = {
                date: excelSerialToJSDate(transaction[index]?.["JYESHTHA MOTORS"]),
                type: "PURCHASE",
                debit: 0,
                credit: transaction[index].__EMPTY_4,
                // account: transaction[index].__EMPTY_2
                // balance: parseBalance(transaction[index]),
                // voucherNumber: transaction[index].__EMPTY_1,
            }
            transactions.push(tempTransaction);

        } else {
            tempTransaction = null; //  Probably a blank row or Invoice row
        }



    }

    return transactions;
}



const getTotalCreditAndDebit = (transactions: Transaction[]): { totalCredit: number, totalDebit: number } => {
    let totalCredit = 0;
    let totalDebit = 0;
    transactions.forEach(transaction => {
        totalCredit += transaction?.credit || 0;
        totalDebit += transaction?.debit || 0;
    });

    // console.log("Total Credit and Debit", totalCredit, totalDebit);

    return {
        totalCredit,
        totalDebit
    };


}


// TYPES 


type Transaction = {
    date: Date,
    type: string,
    // voucherNumber: string,
    debit: number,
    credit: number,
    // balance: number,
    // account: string,
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




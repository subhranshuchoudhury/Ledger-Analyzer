export const changeUniFormOwnFile = (exceldata: any) => {

    const uniformData: UniformDataType = {
        account: parsePartyAccount(exceldata[3]),
        openingBalance: parseOpeningBalance(exceldata[4]),
        transactions: parseTransaction(exceldata),
        closingBalance: parseClosingBalance(exceldata[exceldata.length - 1]),
        totalCredit: parseTotalCredit(exceldata[exceldata.length - 2]),
        totalDebit: parseTotalDebit(exceldata[exceldata.length - 2])
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

const parsePartyAccount = (data: Object) => {
    // Extract the account name
    // Extract the account name
    const accountName = data["JYESHTHA MOTORS"].replace("Account : ", "");

    // Extract the date range
    const dateRangeMatch = data["__EMPTY_3"].match(/From (\d{1,2})-(\d{1,2})-(\d{4}) to (\d{1,2})-(\d{1,2})-(\d{4})/);

    const startDay = parseInt(dateRangeMatch[1], 10);
    const startMonth = parseInt(dateRangeMatch[2], 10) - 1; // Subtract 1 as months are 0-indexed
    const startYear = parseInt(dateRangeMatch[3], 10);

    const endDay = parseInt(dateRangeMatch[4], 10);
    const endMonth = parseInt(dateRangeMatch[5], 10) - 1; // Subtract 1 as months are 0-indexed
    const endYear = parseInt(dateRangeMatch[6], 10);

    const startDate = new Date(startYear, startMonth, startDay);
    const endDate = new Date(endYear, endMonth, endDay);



    return {
        accountName,
        startDate,
        endDate,
        duration: `${startDate.toDateString()} to ${endDate.toDateString()}`
    }
}

const parseTotalCredit = (totalAmount: object): number => {
    return parseFloat(totalAmount?.["__EMPTY_4"]);
}

const parseTotalDebit = (totalAmount: string): number => {
    return parseFloat(totalAmount?.["__EMPTY_3"]);
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

const parseBalance = (balance: string): number => {
    return parseFloat(balance?.["__EMPTY_5"].replace(/[^\d.-]/g, ''));
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




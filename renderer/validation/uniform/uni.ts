export const changeUniFormOwnFile = (exceldata: any) => {

    const uniformData: UniformDataType = {
        account: parsePartyAccount(exceldata[3]),
        openingBalance: parseOpeningBalance(exceldata[4]),
        transactions: parseTransaction(exceldata),
        closingBalance: parseOpeningBalance(exceldata[exceldata.length - 1]),
        totalCredit: parseTotalCredit(exceldata[exceldata.length - 2]),
        totalDebit: parseTotalDebit(exceldata[exceldata.length - 2])
    }

    console.log("UNIFORM DATA: ", uniformData)

    return uniformData;


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


const excelSerialToJSDate = (serial: number): Date => {
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
    const amountString = openingBalanceString?.["__EMPTY_3"];

    const numericPart = amountString.match(/[-+]?\d{1,3}(,?\d{3})*(\.\d+)?/);

    // Convert the extracted numeric part to a number
    const numericAmount = numericPart ? parseFloat(numericPart[0].replace(/,/g, '')) : NaN;

    return numericAmount;
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
        duration: data["__EMPTY_3"]
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
            account: "INVALID_FILE",
            balance: 0,
            credit: 0,
            date: null,
            debit: 0,
            type: "INVALID_FILE",
            voucherNumber: "INVALID_FILE"
        };


        if (transaction[index].__EMPTY === "Pymt") {

            tempTransaction = {
                date: excelSerialToJSDate(transaction[index]?.["JYESHTHA MOTORS"]),
                type: "PAYMENT",
                voucherNumber: transaction[index].__EMPTY_1,
                debit: transaction[index].__EMPTY_3,
                credit: 0,
                balance: parseBalance(transaction[index]),
                account: transaction[index].__EMPTY_2
            }



        } else if (transaction[index].__EMPTY === "Purc") {
            tempTransaction = {
                date: excelSerialToJSDate(transaction[index]?.["JYESHTHA MOTORS"]),
                type: "PURCHASE",
                voucherNumber: transaction[index].__EMPTY_1,
                debit: 0,
                credit: transaction[index].__EMPTY_4,
                balance: parseBalance(transaction[index]),
                account: transaction[index].__EMPTY_2
            }
        } else {
            tempTransaction = null;
        }

        transactions.push(tempTransaction);


    }

    return transactions;
}

const parseBalance = (balance: string): number => {
    return parseFloat(balance?.["__EMPTY_5"].replace(/[^\d.-]/g, ''));
}

type Transaction = {
    date: Date,
    type: string,
    voucherNumber: string,
    debit: number,
    credit: number,
    balance: number,
    account: string,
}




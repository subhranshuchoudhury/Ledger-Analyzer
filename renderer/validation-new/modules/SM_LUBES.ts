let mainKey = "S M LUBES";

export const MAIN = (excelData: any) => {
    console.log(mainKey, (excelData));
    const keys = Object.keys(excelData[0]);
    mainKey = keys[0];
    console.log("Keys", keys);
    const OB = getOpeningBalance(excelData);
    const CB = getClosingBalance(excelData);
    const LT = getTransactionDetails(excelData);
    const TCD = getTotalCreditAndDebit(LT);
    return {
        account: {
            accountName: mainKey,
            duration: `${LT[0].date.toDateString()} - ${LT[LT.length - 1].date.toDateString()}`,
            startDate: LT[0].date,
            endDate: LT[LT.length - 1].date,
        },
        openingBalance: OB,
        closingBalance: CB,
        transactions: LT,
        totalCredit: TCD.totalCredit,
        totalDebit: TCD.totalDebit,
    };
};

function getOpeningBalance(excelData: any): number {
    const openingBalanceRow = 8;
    const fieldName = "__EMPTY_4";
    const openingBalance = Number(excelData[openingBalanceRow][fieldName]);
    console.log("Opening Balance", openingBalance);
    return openingBalance;
}

function getClosingBalance(excelData: any): number {
    const closingBalanceRow = excelData.length - 2;
    const fieldName = "__EMPTY_5";
    const closingBalance = Number(excelData[closingBalanceRow][fieldName]);
    console.log("Closing Balance", closingBalance);
    return closingBalance;
}

function getLedgerDuration(excelData: any): { startDate: Date, endDate: Date } {

    function convertDate(dateString: string): { startDate: Date, endDate: Date } {
        // Split the input string into start and end date strings
        const [startDateStr, endDateStr] = dateString.split(' - ');

        // Convert date strings to JavaScript Date objects
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        // Return an object containing start and end dates
        return { startDate, endDate };
    }

    const durationRow = 3;
    const fieldName = "RAHUL AUTO AGENCY PVT. LTD."
    const durationUnFiltered = excelData[durationRow][fieldName];
    const duration = convertDate(durationUnFiltered);
    console.log("Duration", duration);
    return duration;


    // console.log("Duration", startDate, endDate);
    return convertDate("01-04-2021 - 31-03-2022");

}

function getTransactionDetails(excelData: any): any[] {
    const transactionDetails = [];
    const transactionStartRow = 9;
    const transactionEndRow = excelData.length - 4;
    const creditFieldName = "__EMPTY_5";
    const debitFieldName = "__EMPTY_4";
    const dateFieldName = mainKey;
    for (let i = transactionStartRow; i <= transactionEndRow; i++) {
        let tempTransaction = {
            date: excelSerialToJSDate(excelData[i][dateFieldName]),
            type: excelData[i][creditFieldName] ? "PURCHASE" : "PAYMENT",
            credit: excelData[i][creditFieldName] ? Number(excelData[i][creditFieldName]) : 0,
            debit: excelData[i][debitFieldName] ? Number(excelData[i][debitFieldName]) : 0,
        }
        transactionDetails.push(tempTransaction);
    }
    console.log("Transaction Details", transactionDetails);
    return transactionDetails;
}

function getTotalCreditAndDebit(transactions: any[]): { totalCredit: number, totalDebit: number } {
    let totalCredit = 0;
    let totalDebit = 0;
    transactions.forEach(transaction => {
        totalCredit += transaction?.credit || 0;
        totalDebit += transaction?.debit || 0;
    });

    console.log("Total Credit and Debit", totalCredit, totalDebit);

    return {
        totalCredit,
        totalDebit
    };

}

function excelSerialToJSDate(serial: number): Date {
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




export const MAIN = (excelData: any) => {
    // console.log("TOPSEL", (excelData));
    const OB = getOpeningBalance(excelData);
    const CB = getClosingBalance(excelData);
    const LD = getLedgerDuration(excelData);
    const LT = getTransactionDetails(excelData);
    const TCD = getTotalCreditAndDebit(LT);
    return {
        account: {
            accountName: "TOPSEL MARKETING PVT. LTD.",
            duration: `${LD.startDate.toDateString()} to ${LD.endDate.toDateString()}`,
            startDate: LD.startDate,
            endDate: LD.endDate,
        },
        openingBalance: OB,
        closingBalance: CB,
        transactions: LT,
        totalCredit: TCD.totalCredit,
        totalDebit: TCD.totalDebit,
    };
};


function getOpeningBalance(excelData: any): number {
    const openingBalanceRow = 13;
    const fieldName = "__EMPTY_4";
    const openingBalance = Number(excelData[openingBalanceRow][fieldName]);
    // console.log("Opening Balance", openingBalance);
    return openingBalance;
}

function getClosingBalance(excelData: any): number {
    const closingBalanceRow = excelData.length - 2;
    const fieldName = "__EMPTY_5";
    const closingBalance = Number(excelData[closingBalanceRow][fieldName]);
    // console.log("Closing Balance", closingBalance);
    return closingBalance;
}

function getLedgerDuration(excelData: any): { startDate: Date, endDate: Date } {

    function convertDate(dates: string): Date {
        let dateParts = dates.split("-");
        return new Date(`20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

    }
    const durationRow = 11;
    const fieldName = "TOPSEL MARKETING PVT. LTD.";
    const durationUnFiltered = excelData[durationRow][fieldName];
    const duration = durationUnFiltered.split("to").map((date: string) => date.trim());

    const startDate = convertDate(duration[0]);
    const endDate = convertDate(duration[1]);

    // console.log("Duration", startDate, endDate);
    return { startDate, endDate };

}

function getTransactionDetails(excelData: any): any[] {
    const transactionDetails = [];
    const transactionStartRow = 14;
    const transactionEndRow = excelData.length - 4;
    const creditFieldName = "__EMPTY_5";
    const debitFieldName = "__EMPTY_4";
    const dateFieldName = "TOPSEL MARKETING PVT. LTD.";
    for (let i = transactionStartRow; i <= transactionEndRow; i++) {
        let tempTransaction = {
            date: excelSerialToJSDate(excelData[i][dateFieldName]),
            type: excelData[i][creditFieldName] ? "PURCHASE" : "PAYMENT",
            credit: excelData[i][creditFieldName] ? Number(excelData[i][creditFieldName]) : 0,
            debit: excelData[i][debitFieldName] ? Number(excelData[i][debitFieldName]) : 0,
        }
        transactionDetails.push(tempTransaction);
    }
    // console.log("Transaction Details", transactionDetails);
    return transactionDetails;
}

function getTotalCreditAndDebit(transactions: any[]): { totalCredit: number, totalDebit: number } {
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




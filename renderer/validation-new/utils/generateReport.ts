import xlsx from "json-as-xlsx"
export const generateReport = (dataOne: MismatchSchema[], dataTwoReversed: MismatchSchema[], transactionsOwnLedger: UniformDataType, transactionsCreditorsLedger: UniformDataType) => {
    let reportArray: Report[] = [];

    // dig DataOne

    dataOne.forEach((obj) => {
        let isPayment = false;
        if (obj.debitCount > obj.creditCount) {
            isPayment = true;
        }

        obj.indexes.ledgerOne.forEach((index) => {
            let report: Report = {
                accountName: isPayment ? transactionsCreditorsLedger.account.accountName : transactionsOwnLedger.account.accountName,
                amount: obj.amount,
                date: transactionsOwnLedger.transactions[index].date,
                isPayment: isPayment
            };
            reportArray.push(report);
        });

        obj.indexes.ledgerTwo.forEach((index) => {
            let report: Report = {
                accountName: isPayment ? transactionsCreditorsLedger.account.accountName : transactionsOwnLedger.account.accountName,
                amount: obj.amount,
                date: transactionsCreditorsLedger.transactions[index].date,
                isPayment: isPayment
            };
            reportArray.push(report);
        });
    });

    // dig DataTwo

    dataTwoReversed.forEach((obj) => {
        let isPayment = false;
        if (obj.debitCount > obj.creditCount) {
            isPayment = true;
        }

        obj.indexes.ledgerOne.forEach((index) => {
            let report: Report = {
                accountName: isPayment ? transactionsCreditorsLedger.account.accountName : transactionsOwnLedger.account.accountName,
                amount: obj.amount,
                date: transactionsOwnLedger.transactions[index].date,
                isPayment: isPayment
            };
            reportArray.push(report);
        });

        obj.indexes.ledgerTwo.forEach((index) => {
            let report: Report = {
                accountName: isPayment ? transactionsCreditorsLedger.account.accountName : transactionsOwnLedger.account.accountName,
                amount: obj.amount,
                date: transactionsCreditorsLedger.transactions[index].date,
                isPayment: isPayment
            };
            reportArray.push(report);
        });
    });



    console.log("Report Array after DataOne", reportArray);
    excelDownload(transactionsCreditorsLedger, reportArray);
}

export const excelDownload = (ledgerReportAccount: UniformDataType, report: Report[]) => {

    let content = [];

    content[0] = { "COL1": "SL No.", "COL2": "Source", "COL3": "Date", "COL4": "Bills", "COL5": "Payments" };

    report.forEach((obj, index) => {
        content[index + 1] = {
            "COL1": index + 1,
            "COL2": obj.accountName,
            "COL3": obj.date.toDateString(),
            "COL4": obj.isPayment ? "" : obj.amount,
            "COL5": obj.isPayment ? obj.amount : ""
        }
    });


    let data = [
        {
            sheet: "Sheet1",
            columns: [
                { label: ledgerReportAccount.account.duration, value: "COL1" },
                { label: ledgerReportAccount.account.accountName, value: "COL2" },
                { label: new Date().toDateString(), value: "COL3" },
                { label: "⠀", value: "COL4" }, // blank space needed ( dangerous character )
                { label: "⠀⠀", value: "COL5" },
            ],
            content
        },
    ];

    // Combine the heading and data


    let settings = {
        fileName: `${ledgerReportAccount.account.accountName}_LEDGER_MATCH_REPORT_${ledgerReportAccount.account.duration}_${new Date().getTime()}`, // Name of the resulting spreadsheet
        extraLength: 3, // A bigger number means that columns will be wider
        writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
        writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
        RTL: false, // Display the columns from right-to-left (the default value is false)
    }

    xlsx(data, settings);

}

type MismatchSchema = {
    amount: number;
    creditCount: number;
    debitCount: number;
    indexes: {
        ledgerOne: number[];
        ledgerTwo: number[];
    };
};

type Transaction = {
    date: Date,
    type: string,
    // voucherNumber: string,
    debit: number,
    credit: number,
    // balance: number,
    // account: string,
}

type Report = {
    accountName: string,
    amount: number,
    date: Date,
    isPayment: boolean,
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
export const changeUniFormOwnFile = (exceldata: object) => {

    const uniformData: any = {
        account: parsePartyAccount(exceldata[3]),
        openingBalance: parseOpeningBalance(exceldata[4])
    }

    console.log("UNIFORM DATA: ", uniformData)


}


const excelSerialToJSDate = (serial: number): Date => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const excelStartDate = new Date('1900-01-01T00:00:00Z');

    // Calculate the number of days from the Excel start date
    const days = serial - 1;

    // Calculate the total milliseconds
    const totalMilliseconds = days * millisecondsPerDay;

    // Convert to JavaScript Date object
    const resultDate = new Date(excelStartDate.getTime() + totalMilliseconds);

    return resultDate;
}

const parseOpeningBalance = (openingBalanceString: string) => {
    const numericPart = openingBalanceString?.["__EMPTY_3"].match(/\d+,\d+\.\d+/);

    // Convert the extracted string to a number
    const numericValue = numericPart ? parseFloat(numericPart[0].replace(/,/g, '')) : NaN;

    return (numericValue);
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
        endDate
    }
}



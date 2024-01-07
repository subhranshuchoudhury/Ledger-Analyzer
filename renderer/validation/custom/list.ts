import { stringDateToNumberDate } from "./converter"

type convertNeededDataType = {
    companyName: string,
    keyName: string,
    function: Function
}

export const convertNeededData: convertNeededDataType[] = [
    {
        companyName: "Company Name : UNIVERSAL COMPONENTS DISTRIBUTION PRIVATE LIMITED",
        keyName: "date",
        function: stringDateToNumberDate
    }
]
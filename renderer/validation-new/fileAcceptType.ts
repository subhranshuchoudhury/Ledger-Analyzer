export const fileAcceptType = [
    {
        type: "XLSX",
        accept: "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        function: "handleFileInput",


    },
    {
        type: "PDF",
        accept: "application/pdf",
        function: "handlePDFInput"
    }
]

export const handleAcceptType = (type: string) => {
    return fileAcceptType.find((item) => item.type === type);
}
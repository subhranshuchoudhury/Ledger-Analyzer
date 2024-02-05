

export const generateContent = async (excelContent: string) => {
    const headers = new Headers();
    headers.append('content-type', 'application/json');


    const appendBody = `Return only JSON object with the following structure from excel converted json string: ${{
        account: {
            accountName: "string",
            duration: "string",
            endDate: "string",
            startDate: "string"
        },
        openingBalance: "string",
        closingBalance: "string",
        totalCredit: "string",
        totalDebit: "string",
        transactions: [
            {
                date: "string (DD-MM-YYYY)",
                debit: "string",
                credit: "string",
                type: "if credit PURCHASE, if debit PAYMENT",
            }
        ]
    }
        }`

    const messageBody = {
        "contents": [
            {
                "role": "user",
                "parts": [{
                    "text": `${appendBody} --> ${excelContent}`
                }]
            }
        ]
    }

    const body = JSON.stringify(messageBody);

    const init = {
        method: 'POST',
        headers,
        body
    };
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_KEY}`, init);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}



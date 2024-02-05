

export const generateContent = async (message: string) => {
    const headers = new Headers();
    headers.append('content-type', 'application/json');

    const messageBody = {
        "contents": [
            {
                "role": "user",
                "parts": [{
                    "text": `${message}`
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
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMNI_KEY}`, init);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}


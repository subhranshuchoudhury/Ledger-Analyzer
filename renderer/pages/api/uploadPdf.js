// pages/api/uploadPdf.js

import PDFParser from 'pdf2json';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { file } = req.body;

            // Convert base64-encoded string to buffer
            const buffer = Buffer.from(file, 'base64');

            // Use pdf2json to convert the PDF buffer to JSON
            const pdfParser = new PDFParser();

            pdfParser.on('pdfParser_dataError', (errData) => {
                console.error(errData.parserError);
                res.status(500).json({ error: 'Error parsing PDF data' });
            });

            pdfParser.on('pdfParser_dataReady', (pdfData) => {
                // Handle the converted PDF data as needed
                // console.log('Converted PDF data:', pdfData);

                // You may want to save the data, parse it, or perform other actions

                res.status(200).json({ data: pdfData })
            });

            pdfParser.parseBuffer(buffer);
        } catch (error) {
            console.error('Error processing file:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}

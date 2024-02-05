import React, { useEffect } from 'react'
import { generateContent } from './api'

export default function index() {

    useEffect(() => {
        apiCall()

    }, [])

    const apiCall = async () => {
        const prompt = {
            "account": {
                "accountName": "RAHUL AUTO AGENCY PVT. LTD.",
                "startDate": null,
                "endDate": null,
                "duration": null
            },
            "openingBalance": 0,
            "transactions": [
                {
                    "date": "2023-04-08T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 631,
                    "credit": 0
                },
                {
                    "date": "2023-04-08T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 656,
                    "credit": 0
                },
                {
                    "date": "2023-04-08T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1158,
                    "credit": 0
                },
                {
                    "date": "2023-04-13T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 557,
                    "credit": 0
                },
                {
                    "date": "2023-04-14T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 12986,
                    "credit": 0
                },
                {
                    "date": "2023-04-15T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1915,
                    "credit": 0
                },
                {
                    "date": "2023-04-28T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1967,
                    "credit": 0
                },
                {
                    "date": "2023-04-28T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2953,
                    "credit": 0
                },
                {
                    "date": "2023-04-28T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 475
                },
                {
                    "date": "2023-04-30T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 8570
                },
                {
                    "date": "2023-05-05T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-06T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-08T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 3063,
                    "credit": 0
                },
                {
                    "date": "2023-05-09T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1414,
                    "credit": 0
                },
                {
                    "date": "2023-05-10T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-11T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-12T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-13T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-15T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-16T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-17T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 6875,
                    "credit": 0
                },
                {
                    "date": "2023-05-18T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2117,
                    "credit": 0
                },
                {
                    "date": "2023-05-18T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-18T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-20T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 6790
                },
                {
                    "date": "2023-05-22T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 6790
                },
                {
                    "date": "2023-05-23T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-24T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-25T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-26T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-27T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 3063,
                    "credit": 0
                },
                {
                    "date": "2023-05-29T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-30T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 3155,
                    "credit": 0
                },
                {
                    "date": "2023-05-30T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3395
                },
                {
                    "date": "2023-05-31T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 8757,
                    "credit": 0
                },
                {
                    "date": "2023-05-31T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2953,
                    "credit": 0
                },
                {
                    "date": "2023-05-31T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 3155
                },
                {
                    "date": "2023-06-12T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 7091,
                    "credit": 0
                },
                {
                    "date": "2023-06-14T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 14542,
                    "credit": 0
                },
                {
                    "date": "2023-06-21T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2544,
                    "credit": 0
                },
                {
                    "date": "2023-06-28T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 587,
                    "credit": 0
                },
                {
                    "date": "2023-07-01T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 7621,
                    "credit": 0
                },
                {
                    "date": "2023-07-03T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 5000
                },
                {
                    "date": "2023-07-04T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2404,
                    "credit": 0
                },
                {
                    "date": "2023-07-04T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2878,
                    "credit": 0
                },
                {
                    "date": "2023-07-04T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 5000
                },
                {
                    "date": "2023-07-05T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 6573,
                    "credit": 0
                },
                {
                    "date": "2023-07-05T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 5000
                },
                {
                    "date": "2023-07-06T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 5000
                },
                {
                    "date": "2023-07-07T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 5000
                },
                {
                    "date": "2023-07-09T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-10T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-11T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-12T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2062,
                    "credit": 0
                },
                {
                    "date": "2023-07-12T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-13T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-14T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-15T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-17T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 4078
                },
                {
                    "date": "2023-07-18T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-19T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 6303,
                    "credit": 0
                },
                {
                    "date": "2023-07-19T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-20T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1034,
                    "credit": 0
                },
                {
                    "date": "2023-07-20T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-21T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-24T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2545,
                    "credit": 0
                },
                {
                    "date": "2023-07-24T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-25T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-26T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 3020,
                    "credit": 0
                },
                {
                    "date": "2023-07-26T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-27T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-07-28T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2039
                },
                {
                    "date": "2023-08-05T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 5232,
                    "credit": 0
                },
                {
                    "date": "2023-08-16T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2268,
                    "credit": 0
                },
                {
                    "date": "2023-08-19T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 5539,
                    "credit": 0
                },
                {
                    "date": "2023-08-22T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 975,
                    "credit": 0
                },
                {
                    "date": "2023-08-22T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1315,
                    "credit": 0
                },
                {
                    "date": "2023-08-28T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1552,
                    "credit": 0
                },
                {
                    "date": "2023-09-05T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 924,
                    "credit": 0
                },
                {
                    "date": "2023-09-07T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-08T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-09T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 3063,
                    "credit": 0
                },
                {
                    "date": "2023-09-09T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-10T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-11T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2970,
                    "credit": 0
                },
                {
                    "date": "2023-09-11T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-12T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-13T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 9427,
                    "credit": 0
                },
                {
                    "date": "2023-09-13T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-14T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-15T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-16T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-18T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-21T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 4738,
                    "credit": 0
                },
                {
                    "date": "2023-09-21T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-23T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1114,
                    "credit": 0
                },
                {
                    "date": "2023-09-24T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 5000
                },
                {
                    "date": "2023-09-25T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-26T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-27T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 3752,
                    "credit": 0
                },
                {
                    "date": "2023-09-27T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-28T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 3127,
                    "credit": 0
                },
                {
                    "date": "2023-09-28T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-09-29T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 872,
                    "credit": 0
                },
                {
                    "date": "2023-09-29T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 1429
                },
                {
                    "date": "2023-09-29T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 2500
                },
                {
                    "date": "2023-10-06T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 6665
                },
                {
                    "date": "2023-10-07T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2430,
                    "credit": 0
                },
                {
                    "date": "2023-10-09T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 6666
                },
                {
                    "date": "2023-10-14T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1175,
                    "credit": 0
                },
                {
                    "date": "2023-10-14T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1178,
                    "credit": 0
                },
                {
                    "date": "2023-10-16T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1245,
                    "credit": 0
                },
                {
                    "date": "2023-10-16T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 3788,
                    "credit": 0
                },
                {
                    "date": "2023-10-17T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 557,
                    "credit": 0
                },
                {
                    "date": "2023-10-25T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 4760
                },
                {
                    "date": "2023-10-26T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 4760
                },
                {
                    "date": "2023-10-27T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 4760
                },
                {
                    "date": "2023-10-28T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2732,
                    "credit": 0
                },
                {
                    "date": "2023-10-28T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 579,
                    "credit": 0
                },
                {
                    "date": "2023-10-28T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 4760
                },
                {
                    "date": "2023-10-30T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 3093,
                    "credit": 0
                },
                {
                    "date": "2023-10-31T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 9518
                },
                {
                    "date": "2023-11-07T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 4026,
                    "credit": 0
                },
                {
                    "date": "2023-11-13T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 5779,
                    "credit": 0
                },
                {
                    "date": "2023-11-14T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 4783
                },
                {
                    "date": "2023-11-15T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1531,
                    "credit": 0
                },
                {
                    "date": "2023-11-15T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 3933,
                    "credit": 0
                },
                {
                    "date": "2023-11-15T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 5033
                },
                {
                    "date": "2023-11-17T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 7068,
                    "credit": 0
                },
                {
                    "date": "2023-11-18T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2049,
                    "credit": 0
                },
                {
                    "date": "2023-11-21T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1032,
                    "credit": 0
                },
                {
                    "date": "2023-11-22T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 9217,
                    "credit": 0
                },
                {
                    "date": "2023-11-23T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 6423,
                    "credit": 0
                },
                {
                    "date": "2023-11-24T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 883,
                    "credit": 0
                },
                {
                    "date": "2023-11-27T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 429,
                    "credit": 0
                },
                {
                    "date": "2023-11-30T00:00:00.000Z",
                    "type": "PURCHASE",
                    "debit": 0,
                    "credit": 4501
                },
                {
                    "date": "2023-12-01T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 4095,
                    "credit": 0
                },
                {
                    "date": "2023-12-02T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2283,
                    "credit": 0
                },
                {
                    "date": "2023-12-04T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 4791,
                    "credit": 0
                },
                {
                    "date": "2023-12-07T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1622,
                    "credit": 0
                },
                {
                    "date": "2023-12-13T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 4675,
                    "credit": 0
                },
                {
                    "date": "2023-12-22T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 1267,
                    "credit": 0
                },
                {
                    "date": "2023-12-23T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 3665,
                    "credit": 0
                },
                {
                    "date": "2023-12-26T00:00:00.000Z",
                    "type": "PAYMENT",
                    "debit": 2561,
                    "credit": 0
                }
            ],
            "closingBalance": -2539,
            "totalCredit": 246937,
            "totalDebit": 244398
        }
        const data = await generateContent(JSON.stringify(prompt))
        console.log(data)
    }
    return (
        <div>index</div>
    )
}

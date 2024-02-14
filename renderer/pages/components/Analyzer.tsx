import React, { useEffect, useState } from 'react'
import { compareCreditDebitCounts, compareCreditDebitCountsReverse } from '../../validation-new/analyze'
export default function Analyzer(props: any) {
    const { ownLedger, creditorsLedger, toggleViewer } = props;

    const [MismatchData, setMismatchData] = useState([])
    const [MismatchDataTwo, setMismatchDataTwo] = useState([])
    const [IsPass, setIsPass] = useState(false)
    const [forceStop, setForceStop] = useState(false)
    const [isValidDetails, setIsValidDetails] = useState({ result: true, message: "", forceStop: false })

    const handleForceStop = (choice: boolean) => {
        setForceStop(choice);
    }

    // console.log("Analyzer", ownLedger, creditorsLedger, toggleViewer);

    useEffect(() => {

        const isPass = isValidationCheck(ownLedger, creditorsLedger);
        setIsValidDetails(isPass);
        if (!isPass.forceStop) {

            compareCreditDebitCounts(ownLedger?.transactions, creditorsLedger?.transactions).then((res) => {
                // console.log("Mismatch", res);
                setMismatchData(res);
                if (!res) {
                    setIsPass(true);
                } else {
                    setIsPass(false);
                }
            });

            compareCreditDebitCountsReverse(ownLedger?.transactions, creditorsLedger?.transactions).then((res) => {
                // console.log("Mismatch", res);
                setMismatchDataTwo(res);
                if (!res) {
                    setIsPass(true);
                } else {
                    setIsPass(false);
                }
            });
        }
    }, [])
    return (
        <div data-theme="dark" className='flex flex-col pb-20'>
            <div className='flex justify-center flex-col gap-10'>
                <LedgerStats isValid={isValidDetails} isOwn={true} Data={ownLedger} DataTwo={creditorsLedger} isPass={IsPass} />
                <LedgerStats isValid={isValidDetails} isOwn={false} Data={creditorsLedger} DataTwo={ownLedger} isPass={IsPass} />

            </div>

            {
                MismatchData?.length > 0 ? <div className='flex justify-center mb-8 mt-14'>
                    <MissMatchStats isReverse={false} Data={MismatchData} ownTransactions={ownLedger?.transactions} creditorsTransactions={creditorsLedger?.transactions} />
                </div> : null
            }

            {
                MismatchData && MismatchDataTwo ? <div className='w-[40%] h-1 bg-green-500 m-auto rounded-lg shadow-lg animate-pulse'></div> : null
            }


            {
                MismatchDataTwo?.length > 0 ? <div className='flex justify-center mb-8 mt-14'>
                    <MissMatchStats isReverse={true} Data={MismatchDataTwo} ownTransactions={creditorsLedger?.transactions} creditorsTransactions={ownLedger?.transactions} />
                </div> : null
            }


            {
                !MismatchData && !MismatchDataTwo && !isValidDetails.result ? <div className='w-[95%] m-auto mt-10'>
                    <div role="alert" className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Everything looks fine!</span>
                    </div>
                </div> : null
            }


        </div>
    )
}

const LedgerStats = (props: any) => {

    const { Data, isPass: globalPass, isOwn, isValid: isPass } = props;

    // check if both the ledgers are same

    // console.log("LedgerStats", isPass);
    const totalCreditTransactions = Data?.transactions?.filter((transaction: any) => transaction?.credit > 0).length;
    const totalDebitTransactions = Data?.transactions?.filter((transaction: any) => transaction?.debit > 0).length;
    // console.log("Total Credit Transactions", totalCreditTransactions);
    return <div className="stats shadow">

        <div className="stat place-items-center">
            <div className="stat-title">{Data?.account?.accountName}</div>
            <div className={["stat-value text-center", isPass.result && globalPass ? "text-green-500" : "text-red-500 animate-pulse"].join(" ")}>{
                isPass.result && globalPass ? "PASS" : "FAILED"
            }
                <p className='text-sm text-blue-400'>{isPass.message}</p>
            </div>
            <div className="stat-desc">{Data?.account?.duration}</div>
        </div>

        <div className="stat place-items-center">
            <div className="stat-title">Opening Balance</div>
            <div className="stat-value text-secondary">{Data?.openingBalance?.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            })}</div>
            <div className="stat-desc text-secondary">↗︎ Transfers ({Data?.transactions.length})</div>
        </div>

        <div className="stat place-items-center">
            <div className="stat-title">Closing Balance</div>
            <div className="stat-value text-secondary">{Data?.closingBalance?.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            })}</div>
            <div className="stat-desc text-secondary">↗︎ Transfers ({Data?.transactions.length})</div>
        </div>

        <div className="stat place-items-center">
            <div className="stat-title">{isOwn ? "Bills" : "Payments"}</div>
            <div className="stat-value text-blue-600">{Data?.totalCredit?.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            })}</div>
            <div className="stat-desc text-blue-600">↗︎ ({totalCreditTransactions})</div>
        </div>

        <div className="stat place-items-center">
            <div className="stat-title">{isOwn ? "Payments" : "Bills"}</div>
            <div className="stat-value text-blue-600">{Data?.totalDebit?.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            })}</div>
            <div className="stat-desc text-blue-600">↗︎ ({totalDebitTransactions})</div>
        </div>

    </div>
}

const MissMatchStats = (props: any) => {
    const { Data, ownTransactions, creditorsTransactions, isReverse } = props;
    return <ul data-theme="dark" className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">

        {
            Data.map((item: any, index: number) => {

                // find out problem in which ledger
                let problemString = "";
                if (item?.indexes?.ledgerOne?.length > 0 && item?.indexes?.ledgerTwo?.length > 0) {
                    problemString = "Both ledgers have mismatched data";
                } else if (item?.indexes?.ledgerOne?.length > 0) {
                    problemString = "Your Ledger has mismatched data";
                } else {
                    problemString = "Creditors Ledger has mismatched data";
                }
                return <li key={index}>
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <div className={[index % 2 === 0 ? "timeline-start md:text-end mb-10" : "timeline-end"].join(" ")}>
                        <time className="font-mono italic">Problem {index + 1}</time>
                        <div className="text-lg font-black">{
                            problemString
                        }</div>
                        <span className='text-blue-200'>{item?.reportString}</span>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Date</th>
                                        <th>Credit</th>
                                        <th>Debit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* rows */}
                                    {/* I don't know why the index that are returning from analyze.js is reversed. */}
                                    {/* But This solution works */}
                                    {
                                        !isReverse ? <>
                                            {
                                                item?.indexes?.ledgerOne?.length > 0 && item?.indexes?.ledgerOne?.map((idx: number, index: number) => {
                                                    console.log("YO's", idx);
                                                    console.log("YO's", ownTransactions);
                                                    return <tr key={index}>
                                                        <th>{index + 1} (Your's file) </th>
                                                        <td>{ownTransactions[idx]?.date.toDateString()}</td>
                                                        <td>{ownTransactions[idx]?.credit}</td>
                                                        <td>{ownTransactions[idx]?.debit}</td>
                                                    </tr>
                                                })
                                            }

                                            {
                                                item?.indexes?.ledgerTwo?.length > 0 && item?.indexes?.ledgerTwo?.map((idx: number, index: number) => {
                                                    console.log("Creditor's", idx);
                                                    console.log("Creditor's", creditorsTransactions);
                                                    return <tr key={index}>
                                                        <th>{index + 1} (Creditor's file) </th>
                                                        <td>{creditorsTransactions[idx]?.date.toDateString()}</td>
                                                        <td>{creditorsTransactions[idx]?.credit}</td>
                                                        <td>{creditorsTransactions[idx]?.debit}</td>
                                                    </tr>
                                                })
                                            }
                                        </> : <>
                                            {
                                                item?.indexes?.ledgerOne?.length > 0 && item?.indexes?.ledgerOne?.map((idx: number, index: number) => {
                                                    console.log("YO's", idx);
                                                    console.log("YO's", ownTransactions);
                                                    return <tr key={index}>
                                                        <th>{index + 1} Your's file(R)</th>
                                                        <td>{creditorsTransactions[idx]?.date.toDateString()}</td>
                                                        <td>{creditorsTransactions[idx]?.credit}</td>
                                                        <td>{creditorsTransactions[idx]?.debit}</td>
                                                    </tr>
                                                })
                                            }

                                            {
                                                item?.indexes?.ledgerTwo?.length > 0 && item?.indexes?.ledgerTwo?.map((idx: number, index: number) => {
                                                    console.log("Creditor's", idx);
                                                    console.log("Creditor's", creditorsTransactions);
                                                    return <tr key={index}>
                                                        <th>{index + 1} Creditor's file(R)</th>
                                                        <td>{ownTransactions[idx]?.date.toDateString()}</td>
                                                        <td>{ownTransactions[idx]?.credit}</td>
                                                        <td>{ownTransactions[idx]?.debit}</td>
                                                    </tr>
                                                })
                                            }
                                        </>
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>

                    <hr />
                </li>
            })
        }

    </ul>
}

const isValidationCheck = (ownLedger: any, creditorsLedger: any) => {
    let isPass = { result: true, message: "", forceStop: false };

    // compatible date


    const areSameDateStart = (ownLedger?.transactions[0]?.date.getDate() === creditorsLedger.transactions[0]?.date.getDate() &&
        ownLedger?.transactions[0]?.date.getMonth() === creditorsLedger.transactions[0]?.date.getMonth() &&
        ownLedger?.transactions[0]?.date.getFullYear() === creditorsLedger.transactions[0]?.date.getFullYear());
    const areSameDateEnd = (ownLedger?.transactions[ownLedger?.transactions.length - 1]?.date.getDate() === creditorsLedger.transactions[creditorsLedger?.transactions.length - 1]?.date.getDate() && ownLedger?.transactions[ownLedger?.transactions.length - 1]?.date.getMonth() === creditorsLedger.transactions[creditorsLedger?.transactions.length - 1]?.date.getMonth() && ownLedger?.transactions[ownLedger?.transactions.length - 1]?.date.getFullYear() === creditorsLedger.transactions[creditorsLedger?.transactions.length - 1]?.date.getFullYear());

    if (!areSameDateStart || !areSameDateEnd) {
        isPass = {
            result: false,
            forceStop: true,
            message: "Duration Mismatch"
        };
    } else if (ownLedger?.closingBalance !== creditorsLedger?.closingBalance) {
        isPass = { result: false, message: "Closing Balance Mismatch", forceStop: false };
    } else if (ownLedger?.totalCredit !== creditorsLedger?.totalDebit) {
        isPass = { result: false, message: "Total Credit Mismatch", forceStop: false };
    } else if (ownLedger?.totalDebit !== creditorsLedger?.totalCredit) {
        isPass = { result: false, message: "Total Debit Mismatch", forceStop: false };
    } else if (ownLedger?.openingBalance !== creditorsLedger?.openingBalance) {
        isPass = { result: false, message: "Opening Balance Mismatch", forceStop: true };
    }

    return isPass;

}

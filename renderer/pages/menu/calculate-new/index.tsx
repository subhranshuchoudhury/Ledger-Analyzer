import React, { useState, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as XLSX from "xlsx";
import toast from 'react-hot-toast';
import { isOwnFile } from '../../../validation/valid';
import { changeUniFormOwnFile } from '../../../validation/uniform/uni';
import { parsePartyAccount } from '../../../validation/uniform/other';
import ledgerRouterSelector from '../../../validation-new/TRAFFIC';

export default function CalculatePage() {

    const router = useRouter();
    const ownSelectRef = useRef(null);
    const otherPartySelectRef = useRef(null);

    const [OwnFileData, setOwnFileData] = useState<any>(null);
    const [OtherPartyData, setOtherPartyData] = useState<any>(null);
    const [ToggleAccordion, setToggleAccordion] = useState(true)

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        const selectedFile = e.target.files?.[0];
        const handleName = e.target.name;
        const loading = toast.loading('Please wait while we are processing your file...');

        if (!selectedFile) {
            toast.error('Please select a file to upload');
            return;
        }
        let excelData: any = null;
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e: any) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            excelData = XLSX.utils.sheet_to_json(sheet);
            console.log(excelData);
            const isOwnFileCheck = isOwnFile(excelData);
            toast.dismiss(loading);



            if (handleName === 'own') {
                if (!isOwnFileCheck) {
                    ownSelectRef.current.value = "";
                    setOwnFileData(null);
                    toast.error("Kindly select your own file")

                } else {

                    setOwnFileData(changeUniFormOwnFile(excelData));  // uni.ts
                    toast.success('Your file has been uploaded successfully');
                }


            } else if (handleName === 'other') {

                if (isOwnFileCheck) {
                    otherPartySelectRef.current.value = "";
                    setOtherPartyData(null);
                    toast.error("Kindly select other party file")
                } else {
                    // const response: any = parsePartyAccount(excelData);
                    // if (response?.error) {
                    //     toast.error(response?.error);
                    //     otherPartySelectRef.current.value = "";
                    //     setOtherPartyData(null);
                    //     return;
                    // } else {
                    //     toast.success('Other party file has been uploaded successfully');
                    //     setOtherPartyData(response);
                    // }

                    ledgerRouterSelector("TEST", "HELLO").then((response: any) => {
                        console.log(response);
                    }).catch((error: any) => {
                        console.log(error);
                    });
                }


            }


        };


    }


    return (
        <React.Fragment >
            <Head>
                <title>Home / Menu / Calculate - The calculation page.</title>
            </Head>

            <>
                <div data-theme="dark">
                    <div className="navbar mt-2">

                        <div className="flex-1">
                            <div onClick={() => router.back()} className='hover:cursor-pointer'>
                                <Image width={40} height={40} alt="back button" src="/images/back.png" />
                            </div>
                        </div>
                        <div className="flex-none gap-2">
                            <a href='/home' className="btn btn-ghost text-xl">Home</a>
                        </div>
                    </div>




                    <div className='flex justify-evenly mt-20'>
                        <div>
                            <p className='text-white uppercase mb-3'>Select Your File <span className='text-red-500'>*</span></p>
                            <input ref={ownSelectRef} name='own' id='owndata' onChange={handleFileInput} accept='application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' type="file" title='Your Excel File' className="file-input file-input-bordered file-input-warning w-full max-w-xs" />
                            {
                                OwnFileData && <div className='flex justify-center mt-4'>
                                    <img onClick={() => {
                                        setOwnFileData(null);
                                        ownSelectRef.current.value = "";

                                    }} className='animate-pulse shadow-2xl hover:cursor-pointer' width={50} height={50} src={"/images/file selected.png"} alt='file selected icon' />
                                </div>
                            }
                        </div>

                        <div>
                            <p className='text-white uppercase mb-3'>Select Other File <span className='text-red-500'>*</span></p>
                            <input ref={otherPartySelectRef} name='other' id='otherdata' onChange={handleFileInput} accept='application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' type="file" title='Other Party Excel File' className="file-input file-input-bordered file-input-success w-full max-w-xs" />
                            {
                                OtherPartyData && <div className='flex justify-center mt-4'>
                                    <img onClick={() => {
                                        setOtherPartyData(null);
                                        otherPartySelectRef.current.value = "";

                                    }} className='animate-pulse shadow-2xl hover:cursor-pointer' width={50} height={50} src={"/images/file selected.png"} alt='file selected icon' />
                                </div>
                            }
                        </div>
                    </div>

                    <div className='flex justify-center mt-16 p-5'>
                        <div className="join join-vertical w-full">
                            <div className="collapse collapse-arrow join-item border border-base-300">
                                <input readOnly checked={true} type="radio" name="my-accordion-1" />
                                <div className="collapse-title text-xl font-medium">
                                    Start Calculation Progress 🚀
                                </div>
                                <div className="collapse-content">
                                    <div className='m-5'>
                                        <Image onClick={() => {
                                            setOwnFileData(null);
                                            setOtherPartyData(null);
                                            ownSelectRef.current.value = "";
                                            otherPartySelectRef.current.value = "";
                                        }} className='hover:cursor-pointer hover:glass rounded-xl' width={50} height={50} alt='start' src={"/images/retry.png"} />
                                        <Image className='hover:cursor-pointer hover:glass rounded-xl' width={50} height={50} alt='start' src={"/images/play.png"} />
                                    </div>
                                </div>
                            </div>
                            {
                                OwnFileData && <div onClick={() => setToggleAccordion(!ToggleAccordion)} className="collapse collapse-arrow join-item border border-base-300">
                                    <input checked={ToggleAccordion} readOnly type="radio" name="my-accordion-2" />
                                    <div className="collapse-title text-xl font-medium capitalize">
                                        Summary of your file 📜
                                    </div>
                                    <div className="collapse-content">
                                        <table className="table mb-10">
                                            {/* head */}
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th></th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* row 1 */}
                                                <tr>
                                                    <th>1</th>
                                                    <td>Account</td>
                                                    <td></td>
                                                    <td>{OwnFileData?.account.accountName}</td>
                                                </tr>
                                                {/* row 2 */}
                                                <tr>
                                                    <th>2</th>
                                                    <td>Duration</td>
                                                    <td></td>
                                                    <td>{OwnFileData?.account.duration}</td>
                                                </tr>
                                                {/* row 3 */}
                                                <tr>
                                                    <th>3</th>
                                                    <td>Start Date</td>
                                                    <td></td>
                                                    <td>{new Date(OwnFileData?.account?.startDate).toDateString()}</td>
                                                </tr>

                                                <tr>
                                                    <th>4</th>
                                                    <td>End Date</td>
                                                    <td></td>
                                                    <td>{new Date(OwnFileData?.account?.endDate).toDateString()}</td>
                                                </tr>

                                                <tr>
                                                    <th>5</th>
                                                    <td>Opening Balance</td>
                                                    <td></td>
                                                    <td>{OwnFileData?.openingBalance}</td>
                                                </tr>
                                                <tr>
                                                    <th>6</th>
                                                    <td>Closing Balance</td>
                                                    <td></td>
                                                    <td>{OwnFileData?.closingBalance}</td>
                                                </tr>
                                                <tr>
                                                    <th>7</th>
                                                    <td>Total Credit</td>
                                                    <td></td>
                                                    <td>{OwnFileData?.totalCredit}</td>
                                                </tr>
                                                <tr>
                                                    <th>8</th>
                                                    <td>Total Debit</td>
                                                    <td></td>
                                                    <td>{OwnFileData?.totalDebit}</td>
                                                </tr>
                                                <tr>
                                                    <th>9</th>
                                                    <td>Total Transactions</td>
                                                    <td></td>
                                                    <td>{OwnFileData?.transactions.length}</td>
                                                </tr>
                                                {
                                                    OwnFileData?.transactions?.map((transaction: any, index: number) => {

                                                        return (
                                                            <tr key={index}>
                                                                <th>{index + 10}</th>
                                                                <td>{new Date(transaction?.date).toDateString()}</td>
                                                                <td></td>
                                                                <td>{transaction?.credit ? "🟢 CREDIT: " + transaction?.credit : "🔴 DEBIT: " + transaction?.debit}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }

                            {
                                OtherPartyData && <div onClick={() => setToggleAccordion(!ToggleAccordion)} className="collapse collapse-arrow join-item border mb-16 border-base-300">
                                    <input checked={!ToggleAccordion} readOnly type="radio" name="my-accordion-2" />
                                    <div className="collapse-title text-xl font-medium">
                                        Summary of other party file 📜
                                    </div>
                                    <div className="collapse-content">
                                        <table className="table mb-10">
                                            {/* head */}
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th></th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* row 1 */}
                                                <tr>
                                                    <th>1</th>
                                                    <td>Account</td>
                                                    <td></td>
                                                    <td>{OtherPartyData?.account.accountName}</td>
                                                </tr>
                                                {/* row 2 */}
                                                {/* <tr>
                                                    <th>2</th>
                                                    <td>Duration</td>
                                                    <td></td>
                                                    <td>{OtherPartyData?.account.duration}</td>
                                                </tr> */}
                                                {/* row 3 */}
                                                {/* <tr>
                                                    <th>3</th>
                                                    <td>Start Date</td>
                                                    <td></td>
                                                    <td>{new Date(OtherPartyData?.account?.startDate).toDateString()}</td>
                                                </tr>

                                                <tr>
                                                    <th>4</th>
                                                    <td>End Date</td>
                                                    <td></td>
                                                    <td>{new Date(OtherPartyData?.account?.endDate).toDateString()}</td>
                                                </tr>

                                                <tr>
                                                    <th>5</th>
                                                    <td>Opening Balance</td>
                                                    <td></td>
                                                    <td>{OtherPartyData?.openingBalance}</td>
                                                </tr>
                                                <tr>
                                                    <th>6</th>
                                                    <td>Closing Balance</td>
                                                    <td></td>
                                                    <td>{OtherPartyData?.closingBalance}</td>
                                                </tr> */}
                                                <tr>
                                                    <th>2</th>
                                                    <td>Total Credit</td>
                                                    <td></td>
                                                    <td>{OtherPartyData?.totalCredit}</td>
                                                </tr>
                                                <tr>
                                                    <th>3</th>
                                                    <td>Total Debit</td>
                                                    <td></td>
                                                    <td>{OtherPartyData?.totalDebit}</td>
                                                </tr>
                                                <tr>
                                                    <th>4</th>
                                                    <td>Total Transactions</td>
                                                    <td></td>
                                                    <td>{OtherPartyData?.transactions.length}</td>
                                                </tr>
                                                {
                                                    OtherPartyData?.transactions?.map((transaction: any, index: number) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th>{index + 5}</th>
                                                                <td>{new Date(transaction?.date).toDateString()}</td>
                                                                <td></td>
                                                                <td>{transaction.credit ? "🟢 CREDIT: " + transaction.credit : "🔴 DEBIT: " + transaction.debit}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>

            </>









        </React.Fragment>
    )
}


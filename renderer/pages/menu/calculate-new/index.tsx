import React, { useState, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as XLSX from "xlsx";
import toast from 'react-hot-toast';
import { isOwnFile } from '../../../validation/own/valid';
import { changeUniFormOwnFile } from '../../../validation/own/uni';
import ledgerRouterSelector from '../../../validation-new/TRAFFIC';
import Analyzer from '../../components/Analyzer';
import Select from 'react-dropdown-select'
import { creditorsList } from '../../../validation-new/creditors-list';

export default function CalculatePage() {

    const router = useRouter();
    const ownSelectRef = useRef(null);
    const otherPartySelectRef = useRef(null);

    const [OwnFileData, setOwnFileData] = useState<any>(null);
    const [OtherPartyData, setOtherPartyData] = useState<any>(null);
    const [ToggleAnalyzer, setToggleAnalyzer] = useState(false);
    const [SelectedCreditorName, setSelectedCreditorName] = useState([])

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        try {
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
                // console.log(excelData);
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
                        toast.error("Kindly select Creditors Ledger file")
                    } else {
                        const creditorName = SelectedCreditorName[0]?.value;
                        if (!creditorName) {
                            toast.error("Choose a creditor first");
                            otherPartySelectRef.current.value = "";
                            setOtherPartyData(null);
                            return;
                        }
                        ledgerRouterSelector(creditorName, excelData).then((response: any) => {
                            if (response?.error) {
                                toast.error(response?.error);
                                otherPartySelectRef.current.value = "";
                                setOtherPartyData(null);
                                return;
                            } else {
                                toast.success('Creditors Ledger file has been uploaded successfully');
                                setOtherPartyData(response);
                            }
                        }).catch((error: any) => {
                            toast.error(error.error);
                            otherPartySelectRef.current.value = "";
                            setOtherPartyData(null);
                            return;
                        });
                    }


                }


            };
        } catch (error) {
            toast.error('An error occurred while processing the file');
            console.log(error);
        }


    }





    return (
        <React.Fragment >
            <Head>
                <title>Home/Menu/Analyze - The Analyzing page.</title>
            </Head>

            <>
                <div data-theme="dark">
                    <div className="navbar mt-2">

                        <div className="flex-1 mt-2">
                            <div onClick={() => router.back()} className='hover:cursor-pointer'>
                                <Image width={40} height={40} alt="back button" src="/images/back.png" />
                            </div>
                        </div>
                        <div className="flex-none gap-2">
                            <a href='/home' className="btn btn-ghost text-xl">Home</a>
                        </div>
                    </div>




                    <div className='flex flex-row justify-evenly mt-20'>
                        <div >
                            <p className='text-white uppercase mb-3 mt-3'>Choose Creditor<span className='text-red-500'>*</span></p>
                            <Select
                                options={creditorsList}
                                values={SelectedCreditorName}
                                onChange={(value) => { setSelectedCreditorName(value) }}
                                searchable={true}
                                clearable={false}
                                placeholder='Select Creditor...'
                                multi={false}
                                color='green'
                                sortBy='label'
                                disabled={!OtherPartyData ? false : true}
                                style={{ width: "299px", borderWidth: "2px", borderColor: "green", padding: "10px" }}
                            />
                        </div>


                        <div className='flex flex-row gap-x-5 flex-wrap'>

                            <div>
                                {
                                    SelectedCreditorName.length > 0 && <>

                                        <p className='text-white uppercase mb-3'>Select Creditor' s Ledger File <span className='text-red-500'>*</span></p>
                                        <input ref={otherPartySelectRef} name='other' id='otherdata' onChange={handleFileInput} accept='application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' type="file" title='Creditors Ledger Excel File' className="file-input file-input-bordered file-input-success w-full max-w-xs" />
                                        {
                                            OtherPartyData && <div className='flex justify-center mt-4'>
                                                <img onClick={() => {
                                                    setOtherPartyData(null);
                                                    setSelectedCreditorName([]);
                                                    otherPartySelectRef.current.value = "";

                                                }} className='animate-pulse shadow-2xl hover:cursor-pointer' width={50} height={50} src={"/images/file selected.png"} alt='file selected icon' />
                                            </div>
                                        }
                                    </>
                                }
                            </div>

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


                        </div>
                    </div>

                    <div className='flex justify-center mt-16 p-5'>
                        <div className="join join-vertical w-full">
                            <div className="collapse collapse-arrow join-item border border-base-300">
                                <input readOnly checked={true} type="radio" name="my-accordion-1" />
                                <div className="collapse-title text-xl font-medium">
                                    Start Analyzing 🚀
                                </div>
                                <div className="collapse-content">
                                    <div className='m-5'>
                                        <Image onClick={() => {
                                            setOwnFileData(null);
                                            setOtherPartyData(null);
                                            ownSelectRef.current.value = "";
                                            setToggleAnalyzer(false);
                                            otherPartySelectRef.current ? otherPartySelectRef.current.value = "" : null;
                                            setSelectedCreditorName([]);
                                        }} title='RESET: Resets all the fields' className='hover:cursor-pointer hover:glass rounded-xl' width={50} height={50} alt='start' src={"/images/retry.png"} />
                                        {
                                            OwnFileData && OtherPartyData && <Image onClick={() => setToggleAnalyzer(!ToggleAnalyzer)} title='Start Analysis' className='hover:cursor-pointer hover:glass rounded-xl' width={50} height={50} alt='start' src={"/images/play.png"} />
                                        }
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                {
                    ToggleAnalyzer && OwnFileData && OtherPartyData && <Analyzer ownLedger={OwnFileData} creditorsLedger={OtherPartyData} />
                }

            </>


        </React.Fragment >
    )
}


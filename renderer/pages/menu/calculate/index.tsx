import React, { useState, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as XLSX from "xlsx";
import toast from 'react-hot-toast';
import { isOwnFile } from '../../../validation/valid';

export default function CalculatePage() {

    const router = useRouter();
    const ownSelectRef = useRef(null);
    const otherPartySelectRef = useRef(null);

    const [OwnFileData, setOwnFileData] = useState<any>(null);
    const [OtherPartyData, setOtherPartyData] = useState<any>(null);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        console.log(e.target.files[0]);

        const selectedFile = e.target.files?.[0];
        const handleName = e.target.name;

        if (!selectedFile) {
            toast.error('Please select a file to upload.');
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



            if (handleName === 'own') {
                if (!isOwnFileCheck) {
                    ownSelectRef.current.value = "";
                    setOwnFileData(null);
                    toast.error("Kindly select your own file.")

                } else {

                    setOwnFileData(excelData);
                    toast.success('Your file has been uploaded successfully.');
                }


            } else if (handleName === 'other') {

                if (isOwnFileCheck) {
                    otherPartySelectRef.current.value = "";
                    setOtherPartyData(null);
                    toast.error("Kindly select other party file.")
                } else {
                    toast.success('Other party file has been uploaded successfully.');

                    setOtherPartyData(excelData);
                }


            }

        };


    }


    return (
        <React.Fragment>
            <Head>
                <title>Home/Menu/Calculate - The calculation page.</title>
            </Head>

            <div className="navbar bg-base-100 mt-2">

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
                            <Image className='animate-pulse shadow-2xl' width={50} height={50} src={"/images/file selected.png"} alt='file selected icon' />
                        </div>
                    }
                </div>

                <div>
                    <p ref={otherPartySelectRef} className='text-white uppercase mb-3'>Select Other File <span className='text-red-500'>*</span></p>
                    <input name='other' id='otherdata' onChange={handleFileInput} accept='application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' type="file" title='Other Party Excel File' className="file-input file-input-bordered file-input-success w-full max-w-xs" />
                    {
                        OtherPartyData && <div className='flex justify-center mt-4'>
                            <Image className='animate-pulse shadow-2xl' width={50} height={50} src={"/images/file selected.png"} alt='file selected icon' />
                        </div>
                    }
                </div>
            </div>





        </React.Fragment>
    )
}


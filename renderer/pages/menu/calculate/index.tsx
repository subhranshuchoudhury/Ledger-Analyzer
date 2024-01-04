import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'


export default function CalculatePage() {

    const router = useRouter();


    return (
        <React.Fragment>
            <Head>
                <title>Menu / Calculate - The calculation page.</title>
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

        </React.Fragment>
    )
}


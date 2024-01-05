import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'


export default function HomePage() {
  return (
    <React.Fragment>


      <Head data-theme="forest">
        <title>Home - Jyeshtha Motors Bill Management</title>
      </Head>

      <main className='flex flex-col h-screen'>
        <div data-theme="forest" className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">JYESHTHA MOTORS</a>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image width={35} height={35} alt="Jm Logo" src="/images/jm.png" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Buttons */}

        <div className='flex justify-center items-center h-screen mt-16'>

          <Link href={"/menu/calculate"}>
            <div className='flex flex-col h-56 w-56 rounded-md shadow-2xl justify-center items-center cursor-pointer hover:bg-gray-600'>
              <div className='bg-green-500 hover:bg-red-500 justify-center flex items-center h-32 w-52 rounded-md p-10'>
                <Image width={90} height={90} alt="Jm Logo" src="/images/calculate-budget.png" />
              </div>
              <p className='flex justify-center items-end mt-5 uppercase font-bold text-white'>Calculate</p>
            </div>
          </Link>

        </div>
        {/* Menu Buttons */}
        <div className='flex justify-center items-end mb-7 h-screen'>
          <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
            <li>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Home
                {/* <span className="badge badge-sm">99+</span> */}
              </a>
            </li>
            <li>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Updates
                <span className="badge badge-sm badge-warning">NEW</span>
              </a>
            </li>
            <li>
              <a>
                Stats
                <span className="badge badge-xs badge-info"></span>
              </a>
            </li>
          </ul>
        </div>
      </main>
    </React.Fragment>
  )
}

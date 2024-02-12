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

        <div className='flex justify-center items-center h-screen'>

          <Link href={"/menu/calculate"}>
            <div className='flex flex-col h-56 w-56 rounded-md shadow-2xl justify-center items-center cursor-pointer hover:bg-gray-600'>
              <div className='bg-green-500 hover:bg-pink-400 justify-center flex items-center h-32 w-52 rounded-md p-10'>
                <Image width={90} height={90} alt="Jm Logo" src="/images/calculate-budget.png" />
              </div>
              <p className='flex justify-center items-end mt-5 uppercase font-bold text-white'>Calculate</p>
            </div>
          </Link>

          <Link href={"/menu/calculate-new"}>
            <div className='flex flex-col h-56 w-56 rounded-md shadow-2xl justify-center items-center cursor-pointer hover:bg-gray-600'>
              <div className='bg-blue-500 hover:bg-pink-400 justify-center flex items-center h-32 w-52 rounded-md p-10'>
                <Image width={90} height={90} alt="Jm Logo" src="/images/calculate-budget.png" />
              </div>
              <p className='flex justify-center items-end mt-5 uppercase font-bold text-white'>Calculate (New)</p>
            </div>
          </Link>

        </div>

      </main>
    </React.Fragment>
  )
}

import React from 'react'
import { topselDemoData } from '../../test/TOPSEL'

function index() {
    console.log(topselDemoData)

    const extractKeyValue = (data: any) => {
        console.log(data)
    }


    return (
        <div data-theme="dark" >
            <div className='bg-gray-600 h-40 mb-11'>
                <p className='text-4xl text-white text-center pt-5'>EXCEL MAPPER</p>
                <p className='text-center mt-1 text-white text-sm'>{Object.keys(topselDemoData[0])[0]}</p>
            </div>
            <div className='flex justify-center'>

                <div>

                    {
                        topselDemoData.map((data, index) => {
                            return <div key={index}>
                                <div className='p-3 border m-2'>

                                    {Object.keys(data).map((key, index) => {
                                        return <div key={index} className='flex justify-between'>
                                            <p className='border m-2 p-1 hover:cursor-pointer hover:bg-green-400 hover:text-gray-950'>{key}</p>
                                            <p>{data[key]}</p>
                                        </div>

                                    })}


                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default index
import React, { useEffect } from 'react'
import { generateContent } from './api'

export default function index() {

    useEffect(() => {
        apiCall()

    }, [])

    const apiCall = async () => {
        const data = await generateContent("TESTING AI CALL")
        console.log(data)
    }
    return (
        <div>index</div>
    )
}

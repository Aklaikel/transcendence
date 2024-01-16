'use client'

import React from 'react'
import { useSelector } from 'react-redux'



export default function Result() {

  const { blueResult, redResult } = useSelector((state: any) => state.game)
  
  return (
    <div className='flex justify-between items-center border border-[#F2C94C]
          w-[265px] h-[90px] max-w-[300px] m-auto p-2 rounded-lg mt-8 text-[#F4F4F4]'>
        <div className='bg-[#EA906C] h-full w-[73px] rounded-lg text-7xl grid place-content-center'>
            <span>{redResult}</span>
        </div>
        <span className='text-[#F2C94C] text-2xl'>vs</span>
        <div className='bg-[#3B559F] h-full w-[73px] rounded-lg text-7xl grid place-content-center'>
            <span>{blueResult}</span>
        </div>
    </div>
  )
}
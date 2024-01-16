'use client'

import React from 'react'
import Form from './Form'

import { useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'

export default function SendMessage() {

    const handleSubmit = (message: string) => {
        console.log(message)
    }

    const {isOpen} = useSelector((state: any) => state.sendMessage)
    
  return (
      <AnimatePresence>
        {isOpen && (
            <Form handleSubmit={handleSubmit}/>
        )}
      </AnimatePresence>
  )
}

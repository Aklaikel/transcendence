'use client'

import { useEffect, useState } from 'react'

import { io } from 'socket.io-client'
import instance from '@/api/axiosInstances'
import socket from '@/plugins/socket'

// const socket = io("http://localhost:8000")


export default function RoomNotifications(
    { obj }: { obj: any }
) {

    const { id, read, roomRotification: [
        {
            message,
        }
    ] } = obj

    useEffect(() => {

        if (read == true) return;
    
        instance.patch(`/notifications`, {
            id
        })
            .then(
                (res: any) => {
                    console.log('message readed')
                    socket.emit('message')
                }
            )
            .catch(
                (err: any) => {
                    console.log(err)
                }
            )
        
    
    }, [])


    return (
        <li className={`${read == false ? 'bg-green/[.2]' : ''} hover:bg-dark-200 px-4 py-2 mt-[1px]`}>
            <span className='text-sm text-green/[.5] block'>Today</span>
            {message}
        </li>
    )
}

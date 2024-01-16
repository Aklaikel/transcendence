'use client'

import { useEffect, useState, useCallback } from 'react'

import { io } from 'socket.io-client'

import instance from '@/api/axiosInstances'
import socket from '@/plugins/socket'


export default function NotificationCounter() {
  
//   const socket = io("http://localhost:800
  const [counter, setCounter] = useState<number>(0)


  


    
    

    useEffect(() => {

      instance.get('/notifications/count')
      .then(
        (res: any) => {
          console.log('counter: ', res.data)
          setCounter(res.data)
        }
      )
      .catch(
        (err: any) => {
          console.log(err)
        }
      )


      socket.on('notification-readed', () => {
          if (counter > 0) {
            setCounter(counter - 1);
          }
      });


      socket.on('new-notification', () => {
        setCounter(counter + 1);
      });


      return () => {
        socket.off('new-notification');
        socket.off('notification-readed');
      };


    }, [socket, counter]);
    

  return (
    <>
        {counter ? <span className='absolute bg-red -top-[9px] -right-[8px] text-xs grid place-content-center rounded-full h-[18px] min-w-[18px]'>{counter}</span> : null}
    </>
  )
}

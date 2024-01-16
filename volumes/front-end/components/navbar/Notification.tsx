"use client";

import { useState } from 'react'

import Icon from '@/components/icon/Icon'
import NotificationCounter from './NotificationCounter'
import NotificationList from './NotificationList'

interface Props {
  name: string,
  className?: string
}


export default function Notification({name, className}: Props) {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='relative'>
      <div
        onClick={toggle}
        className={`grid place-content-center bg-dark border-2 border-green/[.5] rounded-[10px] h-[41px] w-[41px] relative cursor-pointer select-none ${className}`}
      >
          <Icon name={name} width={20}/>
          <NotificationCounter />
      </div>

      { isOpen && <NotificationList/> }
      
    </div>
  )
}

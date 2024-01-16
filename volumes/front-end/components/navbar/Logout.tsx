"use client";

import { useState } from 'react'

import Icon from '@/components/icon/Icon'

import { LogOut as LogoutIcon } from 'lucide-react'

function ToggleLogout() {

    return (
        <div
            className='absolute bg-dark shadow-md shadow-[#151634] break-words right-0
            py-4 px-6 rounded-lg z-50 flex gap-2 translate-y-2 cursor-pointer'
        >
            <LogoutIcon />
            logout
        </div>
    )

}

export default function Logout() {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='relative'>
      <div
        onClick={toggle}
        className={`grid place-content-center bg-dark border-2 border-green/[.5] rounded-[10px] h-[41px] w-[41px] relative cursor-pointer select-none`}
      >
          <Icon name="logout.svg" width={20}/>
      </div>

      { isOpen && <ToggleLogout /> }
    </div>
  )
}

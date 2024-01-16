'use client'

import React from 'react'

import Image from 'next/image'
import { Check, X } from 'lucide-react'

export default function FriendRequest({ obj }: {obj: any}) {

    const { read, notification: [
        {
            senderUser: {
                UserName,
                avatar
            }
        }
    ] } = obj


    // send read notification to server

    return (
        <li className={`${read == false ? 'bg-green/[.2]' : ''} hover:bg-dark-200 px-4 py-2 mt-[1px]`}>
            <span className='text-sm text-green/[.5] block'>Today: Friend Request</span>
            <div className='flex items-center justify-between py-2'>
                <div className='flex items-center gap-2'>
                    <Image src={avatar} width={40} height={40} alt='avatar' className='rounded-full' />
                    <span>{UserName}</span>
                </div>
                <div className='flex items-center gap-4'>
                    <button>
                        <Check strokeWidth={2.5} />
                    </button>
                    <button>
                        <X strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </li>
    )
}

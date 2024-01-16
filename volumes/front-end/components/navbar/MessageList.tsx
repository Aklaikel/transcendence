import React from 'react'
import Image from 'next/image'
import Icon from '../icon/Icon'

export default function MessageList() {
  return (
    <>
        <div className='flex justify-between uppercase text-sm px-4'>
            <span>messages</span>
            <span className='cursor-pointer'>See all messages</span>
        </div>
        <ul className='list-none m-0 mt-3 text-sm'>
            <li className='bg-green/[.2] hover:bg-dark-200 px-4 py-2 mt-[1px]'>
                <span className='text-sm text-green/[.5] block'>Today</span>
                <div className='flex items-center justify-between py-2'>
                    <div className='flex items-center'>
                        <Image src='/images/avatar.png' width={40} height={40} alt='avatar' className='rounded-full'/>
                        <span className='ml-2'>matef</span>
                    </div>
                    <div className='flex items-center'>
                        <span className='mr-4'>
                            <Icon name='accept.svg' width={20}/>
                        </span>
                        <span>
                            <Icon name='reject.svg' width={15}/>
                        </span>
                    </div>
                </div>
            </li>
            <li className='hover:bg-dark-200 px-4 py-2 mt-[1px]'>
                <span className='text-sm text-green/[.5] block'>Today123</span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li className='hover:bg-dark-200 px-4 py-2 mt-[1px]'>
                <span className='text-sm text-green/[.5] block'>Today</span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
        </ul>
    </>
  )
}

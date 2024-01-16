import React from 'react'
import Icon from '../icon/Icon'
import Link from 'next/link'

interface Props {
    name: string,
    content: string,
    className?: string
}

export default function PlayGame({name, content, className = ''}: Props) {
  return (
    <Link href='/game' className={`flex items-center bg-green-200 px-6 py-4 w-full rounded-lg justify-center cursor-pointer ${className}`}>
      
          <Icon name={name} width={40} height={40}/>
          <span className='font-semibold text-xl ml-4'>{content}</span>
      
    </Link>
  )


  
}

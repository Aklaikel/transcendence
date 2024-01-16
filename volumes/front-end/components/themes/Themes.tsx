'use client';

import Image from 'next/image'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface ThemeProps {
    src: string,
    name: string,
    active: boolean
}

const ThemeComponent = ({src, name, active }: ThemeProps) => {


    const [loading, setLoading] = useState<boolean>(false)

    return (
        <div className='h-[170px] bg-[#F5EFE7] flex'>
            <div className='relative w-full'>
                <Image src={src} width={100} height={100} alt="#" className='h-full w-full object-cover' />
                <button
                    className={`cursor-pointer flex justify-center items-center rounded-sm disabled:opacity-90 active:scale-95 py-2 px-4 font-semibold antialiased tracking-wide capitalize absolute right-1 bottom-1 ${active ? "text-[#F4F4F4] bg-dark-100" : "text-dark bg-[#F4F4F4]"}`}
                    disabled={active}
                    onClick={() => setLoading(true)}
                >
                    {loading ? <Loader2 className='mr-1 h-4 w-4 animate-spin' /> : null}
                    {name}
                </button>
            </div>
        </div>
    )
}


export default function Themes() {

    const themes = [
        {
            id: 1,
            src: '/images/coverProfile.png',
            name: 'Default',
            active: true
        },
        {
            id: 2,
            src: '/images/coverProfile.png',
            name: 'Fire',
            active: false
        },
        {
            id: 3,
            src: '/images/coverProfile.png',
            name: 'Ice',
            active: false
        },

    ]

    const [loading, setLoading] = useState<boolean>(false)
    return (

        <>

            <div className='flex flex-col gap-4 w-[70%]'>

                {
                    themes.map((theme) => ( <ThemeComponent key={theme.id} src={theme.src} name={theme.name} active={theme.active} /> ))
                }

            </div>
        </>


    )
}

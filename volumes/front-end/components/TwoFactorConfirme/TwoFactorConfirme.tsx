'use client';

import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import Icon from '@/components/icon/Icon';


export default function TwoFactorConfirme() {


    const [code, setCode] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(false)

    return (
        <div className='max-w-sm text-center flex flex-col justify-center gap-4 antialiased'>
            <Icon name='google_logo.svg' className='h-10 w-10 mx-auto' alt="google logo" />
            <p className='tracking-tight'>
                Please check your email for a verification code from Google. Enter the code to continue.
            </p>

            <div>
                <input
                    type="text"
                    className='bg-dark-200 p-2 rounded-md outline-none w-full'
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder='code'
                />
            </div>
            
            <button
                className='flex justify-center items-center bg-dark-200 h-10 active:scale-95 rounded-md text-sm font-medium transition-colors disabled:opacity-50  disabled:pointer-events-none'
                disabled={loading}
                onClick={() => setLoading(true)}
            >
                {
                    loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null
                }
                Confirme
            </button>
        </div>
    )
}

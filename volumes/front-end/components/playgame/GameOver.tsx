
'use client'

import Image from 'next/image'
import Card from '../playgame/Card'
import { FC, useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const GameOver: FC = () => {

    const [src, setSrc] = useState<string>('')
    const { blueResult, redResult, blueAvatar, redAvatar } = useSelector((state: any) => state.game)

    useEffect(() => {
        if (blueResult > redResult) {
            setSrc(blueAvatar)
        }
        else {
            setSrc(redAvatar)
        }
    }, [])


    return (
        <div className='bg-dark z-50 absolute inset-x-0 inset-y-0 flex justify-center items-center'>
            <div className='pyro'>
                <div className='w-full h-[300px]'>
                    <Image src='/images/game_over.svg' width={1} height={1} alt="game over" className='w-full h-[300px]' />
                </div>

                <div className='flex flex-col items-center justify-center mt-8'>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1] }}
                    >
                        <h3 className='text-[#F4F4F4] text-4xl font-bold antialiased mb-5' >YOU WIN</h3>
                    </motion.div>

                    <motion.div
                        initial={{
                            y: 200,
                            opacity: 0,
                        }}

                        animate={{
                            y: [200, 0],
                            opacity: [0, 1],
                        }}
                    >
                        <Card src={src} rating={91} />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default GameOver;

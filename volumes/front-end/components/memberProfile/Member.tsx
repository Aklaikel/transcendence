'use client'

import React, { useEffect, useState } from 'react'

import TableCompletedGames from '@/components/chatBox/TableCompletedGames'
import Hero from '@/components/hero/Hero';
import PlayGame from '@/components/playgame/PlayGame';
import axios from 'axios';

interface Props {
    userLogin: string
}

export default function Member({userLogin}: Props) {

    const [avatar, setAvatar] = useState<string>('');

    useEffect(() => {

        axios.get(`http://localhost:8000/profile/${userLogin}`)
        .then(res => {
            setAvatar(res.data.avatar)
        })
        .catch(err => console.log(err))

    }, [])

  return (
    <div className='grid grid-cols-5 gap-4'>
      
    <div className='col-span-5'>
      <Hero avatar={avatar}/>
    </div>

    <div className='col-span-5 min-[1200px]:col-span-3'>
      <TableCompletedGames />
    </div>

    <div className='col-span-5 min-[1200px]:col-span-2 '>
      <div className='flex flex-col sm:flex-row gap-4'>
        <PlayGame name='play_a_friend.svg' content='Play a friend' className='h-[100px]'/>
        <PlayGame name='new_game.svg' content='Play new game' className='h-[100px]'/>
      </div>
      {/* <div>
        <HighCharts />
      </div> */}
    </div>
  </div>
  )
}

'use client';



import React, { useState, useEffect } from 'react'
import Card, { LoadCard } from '@/components/playgame/Card'
import GameOver from './GameOver';
import WaitPlayers from '@/components/playgame/WaitPlayers';
import { useMediaQuery } from '@/hooks/customHooks';

import { useSelector } from 'react-redux';

export default function FullGame() {

  const { isGameFinshed } = useSelector((state: any) => state.game)
  const isDesktop = useMediaQuery('(min-width: 1600px)')

  return (
    <div className='h-screen w-screen bg-black flex justify-around items-center'
      style={{ background: 'url(/images/bg2.svg)' }}
    >
      {
        !isGameFinshed ?
          <>
            {isDesktop && <Card src='/images/random/1.jpg' />}
            <WaitPlayers />
            {isDesktop && <Card src='/images/random/4.jpg' />}
          </>
          :
          <GameOver />
      }
    </div>
  )
}
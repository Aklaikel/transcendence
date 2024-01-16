'use client'

import React, { useEffect, useState, useRef, useCallback, use } from 'react'
import Search from './Search'

import Card from './Card'
import CardProps from '@/types/CardRoom'

import ChannelsSkeleton from './Skeleton/ChannelsSkeleton'
import  channels  from '@/api/axiosInstances'

// interface CardProps {
//   id: number,
//   name: string,
//   descreption: string,
//   avatar: string,
//   type: string,
// }


import { useRoomsSearch } from '@/hooks/customHooks'

export default function Channels() {

  const [page, setPage] = useState<number>(0);
  const [query, setQuery] = useState<string>('');

  const observer = useRef<IntersectionObserver>();

  const [loading, rooms, hasMore] = useRoomsSearch(query, page);

  const lastRoomElementRef = useCallback((node: HTMLDivElement) => {

    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((page: number) => page + 1);
      }
    })
  
    if (node) observer.current.observe(node)

  }, [loading, page])


  return (
    <>
      <Search setQuery={setQuery} setNumber={setPage}/>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-w-[1700px] m-auto'>
          {
            rooms.length === 0 ?
              <ChannelsSkeleton />
              :
              rooms.map(({ id, name, descreption, avatar, type }: CardProps, index: number) => {

                if (rooms.length === index + 1) {
                  return <Card ref={lastRoomElementRef} key={id} name={name} description={descreption} avatar={avatar} type={type} />
                }

                return <Card key={id} name={name} description={descreption} avatar={avatar} type={type} />

              })}

          {loading && <ChannelsSkeleton />}
        </div>
      </div>
    </>
  )
}
'use client';
import React from 'react'

import Image from 'next/image'
import Icon from '../icon/Icon'

interface Props {
  src: string,
  rating?: number,
  rating2?: number,
  rating3?: number,
}


import { animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  from: number;
  to: number;
}



function Counter({ from, to }: CounterProps) {

  let n: number = from;

  const counter = useRef(null);

  useEffect(() => {

    const node: any = counter.current;
    if (!node) return;

    if (!counter.current) return;
    let old = from;

    animate(from, to, {
      duration: 1,
      onUpdate: latest => {
        if (old === Math.round(latest)) return;
        old = Math.round(latest);
        node.textContent = old
      }
    })

  }, [])

  return <div ref={counter} > {n}</div>;
}

export function LoadCard() {


  const ref = useRef(null);
  const [src, setSrc] = useState<string>('/images/random/1.jpg')

  const images: string[] = [
    '/images/random/1.jpg',
    '/images/random/2.jpg',
    '/images/random/3.jpg',
    '/images/random/4.jpg',
    '/images/random/5.jpg',
    '/images/random/6.jpg',
  ]

  let index: number = 1;

  useEffect(() => {

    const node: any = ref.current;
    if (!node) return;

    setInterval(() => {
      setSrc(images[index++]);
      if (index === images.length) index = 0;
    }
      , 300)


    // return () => {
    //   clearInterval(id);
    // }

  }, [])



  return (
    <div>
      <div
        className='h-[500px] w-[350px] rounded-lg overflow-hidden'

      >
        <Image ref={ref} src={src} width={300} height={400} alt="#" className='w-full h-full object-cover' />
      </div>
    </div>
  )
}

export default function Card({ src, rating = 90, rating2 = 190, rating3 = 90 }: Props) {
  return (

    <div className='h-[500px] w-[350px] rounded-lg overflow-hidden relative
      after:content[""] after:absolute after:left-0 after:w-full after:h-[90%]
      after:from-dark-200 after:to-transparent
      after:bg-gradient-to-t after:bottom-0 after:z-20'
    >
      <Image src={src} width={300} height={400} alt="#" className='w-full h-full object-cover' priority={true} />

      {/* <div className='absolute top-0 px-4 w-full my-8 flex justify-between'>
        <Icon name='aklaikel/Crystal.svg' width={80} />
      </div> */}
      <div className='absolute bottom-0 z-30 px-4 my-4 flex justify-between w-full'>
        <span className='uppercase text-center text-white'>
          <span className='block text-2xl font-semibold' ><Counter from={rating2} to={rating2 + 10} /></span>
          RATING
        </span>

        <span className='uppercase text-center text-white'>
          <span className='block text-2xl font-semibold'><Counter from={rating} to={rating + 20} /></span>
          RATING
        </span>

        <span className='uppercase text-center text-white'>
          <span className='block text-2xl font-semibold'>
            <Counter from={rating3} to={rating3 + 10} />
          </span>
          RATING
        </span>
      </div>
    </div>

  )
}
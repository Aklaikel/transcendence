'use client';
import { useState } from "react";
import HeroActions, { Item } from './Item';
import Icon from '@/components/icon/Icon';

import SendMessage from './Message/SendMessage';

import Image from "next/image";

interface Props {
  avatar: string;
}

const Hero = ({avatar}: Props) => {
    const [isListVisible, setListVisible] = useState(false);
    const [isMessageVisible, setMessageVisible] = useState(true);

    const toggleList = () => {
      setListVisible(!isListVisible);
    };

  return (
    <>
      {isMessageVisible && <SendMessage />}

      <div className='select-none p-4 h-[358px] flex w-[100%] md:rounded-xl relative bg-[url("https://images.pexels.com/photos/16962631/pexels-photo-16962631/free-photo-of-the-wild-thomas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")] bg-cover bg-center'>
        <div className='flex justify-center w-full items-end md:justify-between md:items-start'>
          <div className='w-[160px] h-[155px] relative pointer-events-none'>
            { avatar != '' ? <Image src={avatar} width={100} height={100} alt='aal' className='w-full h-full rounded-full md:rounded-xl object-cover' /> : null }
            <div className='md:hidden flex justify-center items-center rounded text-white text-xs absolute bottom-2 left-2'>
              <Icon className="bg-[#03C988] p-0.5 rounded-md" name="online_hero.svg" />
            </div>
          </div>

          <div className='hidden md:flex justify-center items-center rounded px-2.5 py-1 bg-[#03C988] text-white text-xs'>
            <Icon name="online_hero.svg" />
            <span className="p-1">Online</span>
          </div>
        </div>

        <div className='px-7 flex md:hidden w-full h-[250px] flex-row-reverse justify-start absolute'>
          <div className='md:hidden cursor-pointer flex w-[30px] h-[30px] transition-transform duration-300'  onClick={toggleList}>
            <Icon name="hamburger_list.svg" className="pointer-events-none"/>
          </div>

              {isListVisible && (
                  <div className='top-[5%] relative px-2 bg-[#26274fB8] flex justify-around items-center flex-col rounded-lg transition-opacity duration-300'>
                      <HeroActions
                        Item={Item}
                        className='rounded-xl py-1.5 px-1.5 w-[70px] min-[290px]:w-[150px]'
                      />
                  </div>
              )}

        </div>

        <div className="absolute bg-[#26274fB8] bottom-[10px] left-4 right-4 rounded hidden md:flex justify-center">
          <div className='flex justify-between items-center w-[100%] max-w-[1000px] p-5'>
            <HeroActions Item={Item}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

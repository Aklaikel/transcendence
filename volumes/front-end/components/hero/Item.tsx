'use client'

import React from 'react';

import {open} from '@/redux_toolkit/sendMessage/sendMessageSlice'

import { useDispatch } from 'react-redux'

import Icon from '@/components/icon/Icon'
import { twMerge } from 'tailwind-merge'

interface Props {
    name: string,
    label: string,
    className?: string,
    handleClick: () => void
}

export  function Item({name, label, className, handleClick}: Props)
{
    return (
        <button
            className={twMerge("flex justify-center items-center rounded bg-[#393A6C] hover:bg-[#44467d] text-[#ADF0D1] py-2.5 px-6 text-xs h-[50px]", className)}
            onClick={handleClick}
        >
            <Icon name={name} className='pointer-events-none'/>
			<span  className="ml-1.5 text-xs md:hidden min-[950px]:block">{label}</span>
        </button>
    )
}

export default function HeroActions({ Item, className }: {Item: React.FC<Props>, className?: string}) {
    
    const dispatch = useDispatch()
    
    const friend = () => {
        console.log("cancel friend request");
    };
    
    const challenge = () => {
        console.log("challenge");
    };
    
    const message = () => {
        dispatch(open());
    };
    
    const block = () => {
        console.log("block");
    };

    const items = [
        { name: "add_friend.svg", label: "Add Friend", handleClick: friend },
        { name: "challenge.svg", label: "Challenge", handleClick: challenge },
        { name: "message_hero.svg", label: "Message", handleClick: message },
        { name: "block.svg", label: "Block", handleClick: block }
    ];

    return (
        <>
            {items.map((item, index) => (
                <Item
                key={index}
                name={item.name}
                label={item.label}
                className={className}
                handleClick={item.handleClick}
                />
            ))}
        </>
    )
}

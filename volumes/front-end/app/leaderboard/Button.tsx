import React, { useState } from 'react'
import Icon from '@/components/icon/Icon';

interface ButtonProps {
    item: any,
    index: number,
    isOpen: number,
    test: (e: any) => void
}



export default function Button({ item, index, isOpen, test }: ButtonProps) {


    return (
        <div className="relative w-full sm:w-64 h-16">
            <div onClick={ () => test(index) } className="cursor-pointer flex bg-dark-200 rounded  justify-between py-4 px-6 items-center h-full">
                <div className='flex'>
                    <Icon name={`aklaikel/${item.src}`} width={50} height={50} />
                    <button className="ml-4 sm:ml-2 font-semibold text-2xl">{item.name}</button>
                </div>

                <div className={`ml-2 transform ${isOpen == index ? 'rotate-180' : ''}  transition-all duration-500 ease-in-out`}>
                    <Icon name="aklaikel/arrowDown.svg" width={20} height={20} />
                </div>

            </div>

            <div className="absolute w-full z-30 ">
                <div className={`shadow-md shadow-[#151634] rounded bg-dark-200 mt-4 overflow-hidden  ${isOpen == index ? 'h-full' : 'h-0'}`}>
                    {
                        item.children.map((child: any, index: number) => (
                            <div key={index} className="flex  py-3 px-4 items-center border-10 hover:bg-dark-100/[.5] cursor-pointer rounded-r-lg border-l-transparent ">
                                <Icon name={`aklaikel/${child.src}`} width={50} height={50} />
                                <button className="ml-2 font-semibold text-2xl ">{ child.name }</button>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}
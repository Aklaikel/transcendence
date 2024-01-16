'use client';
import Image from "next/image"

import React, { useState } from "react"

import Icon from "@/components/icon/Icon"

const items = [
    {
        name: 'Player 1',
        points: 100,
        src: "avatar.png"
    },
    {
        name: 'Player 2',
        points: 90,
        src: "avatar.png"
    },
    {
        name: 'Player 3',
        points: 80,
        src: "avatar.png"
    },
    {
        name: 'Player 4',
        points: 70,
        src: "avatar.png"
    },
    {
        name: 'Player 5',
        points: 60,
        src: "avatar.png"
    },
    {
        name: 'Player 6',
        points: 50,
        src: "avatar.png"
    },
    {
        name: 'Player 7',
        points: 40,
        src: "avatar.png"
    },
    {
        name: 'Player 8',
        points: 30,
        src: "avatar.png"
    },
    {
        name: 'Player 9',
        points: 20,
        src: "avatar.png"
    },
    {
        name: 'Player 10',
        points: 10,
        src: "avatar.png"
    },
]

export default function Rank() {

    const [active, setActive] = useState(0);
    const navigate = (index: number) => {
        
        if (index == -1 && active == 0) return;
        if (index == 1 && active == 4) return;
        
        setActive(active + index);
    }

    return (
        <div>
            <table className="w-full">
                <thead className="">
                    <tr className="bg-dark h-16 font-semibold">
                        <th>Rank</th>
                        <th className="text-left pl-6">Players</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody className="py-4">

                {
                    items.map((element: any, index: number) => {
                        return (
                            <tr key={index} className="h-14 text-center  bg-dark-200 text-md font-semibold items-center">
                                <td>
                                    <span className={`w-[35px] h-[35px] m-auto grid place-content-center rounded-md ${index === 0 ? 'bg-[#FFC800]' : index=== 1 ? "bg-[#9DB2BF]" :index ===2 ? "bg-[#A78867]" : ''}`} >
                                      <div><span>#</span>{index + 1}</div>
                                    </span>
                                </td>
                                <td className="mt-4 flex justify-start items-center">
                                    <Image src={`/images/${element.src}`} height={30} width={30} alt="logo" />
                                    <span className="pl-4">{element.name}</span>
                                </td>
                                <td className=""> {element.points}</td>
                            </tr>

                        )
                    })
                }
                </tbody>
            </table>

            <div className='select-none w-full bg-dark-200 rounded-br-md rounded-bl-md py-4 flex justify-end px-8 items-center'>
            <span
                onClick={() => { navigate(-1) }}
                className='mx-1 w-[30px] h-[30px] grid place-content-center rounded-lg hover:bg-dark/[.5] cursor-pointer'>
                <Icon name="left.svg" width={10} height={10}/>
            </span>
            <ul className='flex'>

                {
                    [1,2,3,4,5].map((item, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => { setActive(index) }}
                                className={`bg-dark mx-1 border-[2px] border-dark-green w-[30px] h-[30px] grid place-content-center rounded-lg hover:bg-dark-green ${active == index ? 'bg-dark-green' : ''} cursor-pointer`}>
                                    {item}
                            </li>
                        )
                    })
                }

            </ul>
            <span onClick={() => { navigate(1) }} className='mx-1 w-[30px] h-[30px] grid place-content-center rounded-lg hover:bg-dark/[.5] cursor-pointer'>
                <Icon name="right.svg" width={10} height={10} />
            </span>
        </div>

            {/* <div className="mt-10 pt-10 pb-5 px-10 border-b border-dark flex justify-between 	bg-dark text-2xl font-semibold">
                <div className="flex  items-center space-x-10">
                    <div>Rank</div>
                    <div>Players</div>
                </div>
                <div> Points</div>
            </div>
            {
                items.map((element: any, index: number) => {
                    return (
                        <div key={index} className="px-8 pb-5 pt-3 flex justify-between bg-dark-200 text-md font-semibold">
                            <div className="flex  items-center space-x-9">
                                <div className="w-12 py-1 text-center h-auto"> {index + 1}</div>
                                <div className="flex space-x-3 items-center ">
                                <Image src={`/icons/${element.src}`} height={40} width={40} alt="logo" />
                                <p>{element.name}</p> </div>
                            </div>
                            <div> {element.points}</div>
                        </div>

                    )
                })
            } */}
        </div>
    )
}
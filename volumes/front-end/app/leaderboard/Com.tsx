'use client';

import Button from "./Button";
import Lead from "./header";
import League from "./league";

import React, { useState } from  'react';
import Rank from "./rank";
import { Profile } from "./profile";

const Com = () => {

    const items = [
        {
            name: "Global",
            src: "Global.svg",
            children: [
                {
                    name: "Friends",
                    src: "Global.svg"
                },
            ]
        },
        {
            name: "Crystal",
            src: "Crystal.svg",
            children: [
                {
                    name: "Platinum",
                    src: "Global.svg"
                },
                {
                    name: "Diamond",
                    src: "Global.svg"
                },
                {
                    name: "Platinum",
                    src: "Global.svg"
                },
                {
                    name: "Diamond",
                    src: "Global.svg"
                },
            ]
        },
        {
            name: "This week",
            src: "Thisweek.svg",
            children: [
                {
                    name: "Friends",
                    src: "Global.svg"
                },
                {
                    name: "51515",
                    src: "Global.svg"
                },
            ]
        },

    ]

    const [isOpen, setIsOpen] = useState<number>(-1)

    const test = (e: number) => {
        e == isOpen ? setIsOpen(-1) : setIsOpen(e)
    }

    return (
        <div className="">
            <Lead />
            <div className="flex flex-col-reverse sm:flex-row">
                <div className="max-w-5xl">
                    <div className="my-10">
                        <League />
                    </div>
                    <div className="flex flex-col sm:flex-row md:space-x-10 space-y-2 sm:space-y-0 w-full">
                        {
                            items.map((item: any, index: number) => {
                                return <Button key={index} item={item} isOpen={isOpen} index={index} test={test} />
                            }
                            )
                        }
                    </div>
                    <div className="mt-10 hidden">
                        <League />
                    </div>
                    <div className="mt-10 ">
                        <Rank />
                    </div>
                </div>
                <div className="mb-6">
                    <Profile />
                </div>
            </div>

        </div>
    )
}

export default Com;
"use client";

import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import axios from "@/api/axiosInstances";


import { ChatBoxs, SearchBar, UserBlock } from "./UserFriend";
import Icon from "../icon/Icon";

interface UserInformation {
    firstName: string,
    lastName: string,
    lastLogin: string,
    Avatar: string,
    bio: string,
}

export default function ChatBox() {
    const [showHide, setShowHide] = useState<boolean>(true);
    const [startConv, setStartConv] = useState<boolean>(false);
    const [showConv, setShowConv] = useState<boolean>(true);
    const clickTimer = useRef<number | null>(null);

    const [users, setUsers] = useState<UserInformation[]>([]);


    const { fullName, avatar,bio} = useSelector((state: any) => state.conversation);
    const {id} = useSelector((state: any) => state.auth);

    const handleClicktimeout = () => {
        if (clickTimer.current === null) {
            clickTimer.current = window.setTimeout(() => {
                setShowHide(!showHide)
                clickTimer.current = null;
            }, 300);
        } else {
            setShowConv(!showConv);
            clearTimeout(clickTimer.current);
            clickTimer.current = null;
        }
    };




    const arrowRef = useRef<HTMLButtonElement>(null);

    const handleClickOnDiv = (e: any) => {
        
        if (arrowRef.current?.contains(e.target)) {
            setStartConv(false)
            return;
        }
        setShowHide(!showHide)

    };


    useEffect(() => {
        if (!id) return;
        console.log("id",id)

        axios.get("/list/friends/" + id)
            .then((res) => {
                setUsers(res.data)
                console.log("caht id",res.data)
            }
            )
            .catch((err) => console.log(err))

    }, [id])




    return (

        <div>
            <Image src={avatar} className={`max-sm:w-[50px] absolut max:sm:flex max-sm:right-7 rounded-full max-sm:bottom-7 ${showHide ? "fixed" : "hidden"} ${showConv ? "fixed" : "hidden"} sm:hidden`} alt='/' width={100} height={100} onClick={() => handleClicktimeout()} />

            <div className={`fixed right-7 max-sm:right-0 bg-[#393A6C] w-[350px] max-sm:h-full max-sm:w-full flex justify-between flex-col  ${showHide ? "-bottom-[30rem] max-sm:-bottom-[100%]" : "bottom-0"}`}  >
                <div className="h-10 w-full bg-[#153E90] flex justify-between items-center p-2  text-semibold " onClick={handleClickOnDiv} >
                    <div className="w-full"> {startConv ?

                        <div className="flex">
                            <button
                                ref={arrowRef}
                            >
                                <Icon name="flech.svg" width={20} height={20} />
                            </button>
                            <div className="flex items-center gap-2 w-full">
                                <Image className="rounded-full" src={avatar} height={30} width={30} alt="/" />
                                <span className="w-full">{`${fullName}`}</span>
                            </div>
                        </div>
                        : "Chat"} </div>
                    {/* <span className={`h-10  ${startConv ? "w-[200px]" : "w-[300px]"}  bg-thumb cursor-pointer bg-red`} onClick={handleClickOnDiv}  ></span> */}
                </div>
                <div className="h-[30rem] px-2 max-sm:h-full  overflow-y-auto scrollbar scrollbar-w-2 scrollbar-thumb-[#393A6C] scrollbar-track-[#393A6C]">
                    {
                        startConv ? <ChatBoxs  /> : <>

                            <SearchBar />

                            {
                                users.map((user: any, index) =>
        
                                    <UserBlock key={index} channelId={user.id} name={user.firstName  + " " + user.lastName} image={user.avatar} status={true} bio={bio} show={startConv} lastLogin={user.lastLogin} changestate={setStartConv} />
                                )}

                        </>
                    }
                </div>
            </div>
        </div >
    )
}
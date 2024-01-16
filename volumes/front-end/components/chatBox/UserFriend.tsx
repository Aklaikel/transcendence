'use client';

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Icon from "../icon/Icon"
import axios from "@/api/axiosInstances";

import { useDispatch, useSelector } from 'react-redux'
import { setChanellId, setUser } from "@/redux_toolkit/conversation/conversationSlice";
import socket from "@/plugins/socket";



interface UsersProps {
    name: string,
    image: string,
    bio: string,
    status: boolean,
    show: boolean,
    changestate: (status: boolean, name: string) => void,
    lastLogin: string,
    channelId: number,


}


interface ClientMessage {
    time: string,
    message: string,
    senderid: string,

}

export const UserBlock = ({  name, image, bio, status, show, lastLogin, changestate,channelId }: UsersProps) => {


    const dispatch = useDispatch();

    const add = () => {
        dispatch(setUser({id: channelId, fullName: name, avatar: image } as any))
        changestate(!show, name);
    }


    return (

        <div key={1} className={`flex justify-between mt-4 cursor-pointer items`} onClick={() => add()} >
            <div className="flex " >
                <Image src={image} alt="" height={50} width={50} className=" border-[2px] rounded-full border-[#006699]" />
                <div className="ml-3">
                    <h3 className="text-lg">{name} </h3>
                    <h1 className="text-sm text-[#006699] overflow-hidden text-ellipsis truncate w-[220px]">{bio}</h1>
                </div>
            </div>
            <div className="flex flex-col justify-between">
                <div className="ml-4 pt-2">
                    <Icon name={`${status ? "online.svg" : "ofline.svg"}`} width={14} />
                </div>
                <h1 className="text-sm text-[#006699] " >{lastLogin} </h1>
            </div>
        </div>

    )
}

export const SearchBar = () => {
    return (
        <div className="relative h-10 mt-3 mb-2 max-sm:m-0 max-sm:mt-3">
            <input
                type="text"
                name="search"
                placeholder="Search"
                className="px-2 bg-dark-200 rounded-lg border-[1px] border-white  h-full outline-none w-full "
            />
            <button className="absolute top-[50%] -translate-y-[50%] right-2">
                <Icon name="search.svg" width={20} height={22} />
            </button>
        </div>
    )
}

export const TextBox = ({ senderid, time, message }: ClientMessage) => {
    let te = useSelector((state: any) => state.auth.id);

    return (
        <div className="mt-5">
            <h3 className={`${senderid == te ? 'ml-10' : "mr-10"} mx-2 text-xs text-white ${senderid == te ? 'text-right' : 'text-left'}`}>{time}</h3>
            <div className={`${senderid == te ? 'bg-[#92AAFF]' : 'bg-[#846cde]'}  p-2  w-30 break-words max-w-20 rounded-3xl  ${senderid == te ? 'ml-10' : "mr-10"}`}>
                <span>
                    {message}
                    <div></div>
                </span>
            </div>
        </div>
    )
}


export const ChatBoxs = () => {

    const { id, email } = useSelector((state: any) => state.conversation);
    const dispatch = useDispatch();
    const userRoomId = useSelector((state: any) => state.conversation.chatId);
    const userId = useSelector((state: any) => state.auth.id);


    useEffect(() => {
        if (!userId) return;

        axios.get(`/list/mesage/${userId}/${id}}`)
            .then((res) => {
                console.log(res.data[0].channel);
                setListemessage(res.data[0].channel);
                dispatch(setChanellId(res.data[0].id))
                socket.emit('join', res.data[0].id.toString());
            }).catch((err) => {
                err;
                console.log("error axios wlah");
            })


    }, [])


    const bottom = useRef<HTMLDivElement>(null);
    const [listmessage, setListemessage] = useState<ClientMessage[]>([]);
    const [message, setMessage] = useState<string>("");
    function sendMessage(event: any) {
        event.preventDefault();
        if (message.length === 0) return;
        const mm =
        {
            senderid: userId,
            receiverid: id,
            email: email,
            time: new Date().toString(),
            message: message,
            chatId: userRoomId,
        }

        socket.emit('privatechat', mm);
        setMessage("");
    }

    useEffect(
        () => {
            if (!userRoomId) return;

            function OnAdd(messageData: any) {
                setListemessage((listmessage: any) => [...listmessage, messageData])

            }
            socket.on('privatechatMsg', OnAdd);
            return () => {
                socket.off('privatechatMsg', OnAdd);
                socket.emit('leave', userRoomId.toString());
            }
        }, [socket, userRoomId]);
    useEffect(() => {
        bottom.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });

    })

    return (
        <div className="bg-[#393A6C] flex flex-col justify-end  h-full ">
            <div className=" h-full overflow-y-auto scrollbar scroll ">
                <div ref={bottom}>
                    {
                        listmessage.map((Element: ClientMessage, index: number) => (
                            <TextBox key={index} senderid={Element.senderid} time={Element.time} message={Element.message} />
                        ))
                    }
                </div>
            </div>
            <div className="p-1 relative bottom-0">
                <form onSubmit={sendMessage}>
                    <input autoComplete="off" id="messagebar" type="text" className="bg-[#393A6C] w-full  p-2 rounded-md outline-none border-[1px] border-white" onChange={(r) => setMessage(r.target.value)} placeholder="type here" value={message} />
                </form>
                <button className="absolute right-4 top-[50%] -translate-y-[50%] " onClick={sendMessage} >
                    <Image src="/icons/send.svg" alt="/" width={30} height={30} />
                </button>
            </div>
        </div>
    )

}
'use client'

import { useEffect, useState } from 'react'

import FriendRequest from './notificationItems/FriendRequest'
import RoomNotifications from './notificationItems/RoomNotifications'
import instance from '@/api/axiosInstances'

export default function NotificationList() {

    const [notifications, setNotifications] = useState<any[]>([])

    const getComponent = (obj: any) => {
        let id = obj.id;

        switch (obj.type) {
            case 'friendRequest':
                return <FriendRequest key={id} obj={obj} />
            
        case 'roomNotification':
                return <RoomNotifications key={id} obj={obj}/>

        default:
            return null
        }
    }

    useEffect(() => {
        instance.get('/notifications')
            .then(
                (res: any) => {
                    setNotifications(res.data)
                }
            )
            .catch(
                (err: any) => {
                    console.log(err)
                }
            )
    }, [])


    return (

        <div className='absolute w-96 bg-dark shadow-md shadow-[#151634] break-words right-0 py-4 rounded-lg z-50 translate-y-2'>
            <div className='flex justify-between uppercase text-sm px-4'>
                <span>notifications</span>
                <span className='cursor-pointer'>See all notifications</span>
            </div>
            <ul className='list-none m-0 mt-3 text-sm max-h-80 overflow-auto scrollbar scrollbar-thumb-dark-200/50 scrollbar-track-dark scrollbar-thumb-rounded-full scrollbar-w-1'>

                {
                    notifications.map(
                        (notification: any) => {

                           

                            return (
                                
                                getComponent(notification)
                                
                            )
                        }
                    )
                }

            </ul>
        </div>
    )
}

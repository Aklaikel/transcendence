import Icon from '@/components/icon/Icon'
import Settings from '@/components/settings/settings'

import Link from 'next/link'

const AllRooms =()=> {
   return (
    <div className=''>
        <div className="p-5 text-xl text-semibold tracking-wider hidden sm:block">
            Settings
        </div>
        <div className='relative flex justify-start w-[100%] space-x-3'>
            <Settings index={1}/>
            <div className='md:bg-[#393A6C] w-full h-full max-w-[800px] flex flex-col rounded p-5'>
                <div className=' text-xl text-semibold w-[167px] h-[50px] tracking-wider'>
                    Rooms
                </div>
                <div className='space-y-2 md:space-y-0'>
                    <ItemRooms />
                    <ItemRooms />
                    <ItemRooms />
                    <ItemRooms />
                    <ItemRooms />
                    <ItemRooms />
                </div>
            </div>
        </div>
    </div>
   )
}
export default AllRooms;

const ItemRooms =()=> {
    return (
        <div className='bg-[#393A6C] w-[100%] rounded-lg flex flex-col md:items-center md:flex-row justify-between select-none space-y-2 md:space-y-0 p-2'>
            <div className='flex items-center justify-start md:justify-around space-x-2'>
                <div className='flex items-center justify-center w-[50px] h-[52px] flex-shrink-0'>
                    <Icon name="randomavatar.svg" className='pointer-events-none h-full w-full rounded-sm'/>
                </div>
                <div className='flex items-center justify-center whitespace-nowrap w-auto h-[52px] text-white font-medium text-sm'>
                    Pongster Room
                </div>
            </div>
            <div className='flex items-center justify-end gap-2 flex-wrap md:flex-nowrap w-full md:w-[65%]'>
                <div className='flex items-center justify-center w-[24%] min-w-[65px]'>
                    <button className='h-[30px] w-full bg-[#D9D9D9] rounded text-dark text-sm'>
                        Delete
                    </button>
                </div>
                <div className='w-[24%] flex items-center justify-center min-w-[65px]'>
                    <Link
                        href='/settings/room/edit/1'
                        className='h-[30px] w-full bg-[#D9D9D9] rounded text-dark text-sm'
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    )
}

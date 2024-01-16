'use client';
import Icon from '@/components/icon/Icon';
import { optionToast } from '@/data/config';
import { postData } from '@/data/fetchData';
import socket from '@/plugins/socket';
import { addNewUser, isLoadingInvite } from '@/redux_toolkit/rooms/roomsRedux';

import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import InviteContainrs from './actions/invite.room';
import { useDebance } from '@/hooks/customHooks';

interface propsUser {
  roomId: number;
}

const InviteUserRoom = ({ roomId }: propsUser) => {
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<any>([]);
  const [debounce] = useDebance(search, 300);
  const dispatch = useDispatch();
  const myId = useSelector((state: any) => state.auth.id);

  const setValueSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setUsers([]);
  };

  const inviteUserAction = async(userId: number) => {
   dispatch(isLoadingInvite(userId))
  
    postData('/userroom/invite', {
      userId: userId,
      roomId: roomId,
      ownerId: myId,
    })
      .then((res: any) => {
        toast.success('successfully add new user', optionToast);
        socket.emit('setUser', res.data)
        socket.emit('setRoom', res.data)
          dispatch(isLoadingInvite(0))
      })
      .catch(({ response }) => {
        toast.error(response.data.message, optionToast);
        dispatch(isLoadingInvite(0))
      });
    
    
  };

  useEffect(() => {
     if (debounce.trim() === '') return;
    postData('/userroom/search', { name: debounce, roomId: roomId, userId: myId })
      .then((res: any) => {
        setUsers(res.data);
        console.log(1)
      })
      .catch(({ response }) => {
        toast.error(response.data.message, optionToast);
      });
  }, [debounce]);
  return (
    <div className="px-3 py-3 w-full h-[60%] ">
      <div className="relative mt-4 w-full">
        <input
          className="p-2.5 w-full rounded-md border border-green/[.5] bg-dark-200 outline-0"
          placeholder="Search Users"
          onChange={setValueSearch}
        />
        <button className=" absolute right-2 p-1 top-[50%] -translate-y-[50%]">
          <Icon name="search.svg" width={25} />
        </button>
      </div> <h3 className='mt-3'>users Like : {search}</h3>
      <div className="py-2 h-full overflow-y-auto crollbar scrollbar-thumb-dark-100 scrollbar-track-dark-200 scrollbar-w-0 select-none">
       
        <div className="flex flex-col gap-2  ">
          {search.length
            ? users.map((element: any) => (
                <InviteContainrs
                  key={element.id}
                  avatar={element.avatar}
                  id={element.id}
                  userLength={element.UsersRooms.length}
                  blockLength={element.BlockUsers.length}
                  UserName={element.UserName}
                  inviteUserAction={inviteUserAction}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default InviteUserRoom;

'use client';
import { usePathname, useRouter } from 'next/navigation';

import NavBar from '@/components/navbar/NavBar';
import SideBar from '@/components/sidebar/SideBar';

import ChatBox from '@/components/chatBox/chatBox';
import axios from '../../api/axiosInstances';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '@/redux_toolkit/auth';

import {
  addNewUser,
  createNewRoomSlice,
  muteUser,
  removeRoom,
  removeUserRoom,
  updateStutusUserRoom,
} from '@/redux_toolkit/rooms/roomsRedux';
import {
  addMessage,
  fetchMessage,
  lockedAction,
  setFoundRoom,
  settyping,
} from '@/redux_toolkit/rooms/messageRedux';

import { Slide, ToastContainer, cssTransition, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import MessagetTypeDto from '../chat/dtoMessage';
import socket from '@/plugins/socket';
import { RoomMakeUser, RoomsDto } from '@/data/roomDto';
import {  Loader2, X } from 'lucide-react';

interface Props {
  chil: React.ReactNode;
  className: string;
}

export default function Childs({ chil, className }: Props) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const id = useSelector((state: any) => state.auth.id);
  const roomid = useSelector((state: any) => state.messages.roomId);
  const firstTime = useSelector((state: any) => state.auth.firstTime);
  const navigate = useRouter();

  const initAuthUser = () => {
    if (id) return;
    axios
      .post('/user')
      .then((res) => {
        console.log(res.data);
        dispatch(authLogin(res.data));
        localStorage.setItem('userId', res.data.id);

        return res.data;
      })
      .catch(({ response }) => {
        if (response.data.statusCode == 401) navigate.push('login');
      });
  };
  useEffect(() => {
    initAuthUser();
    if (!id) return;
    socket.emit('joinGlobal', id);

    function onConnect() {
      console.log('is Connect');
    }

    const onDisconnect = () => {
      console.log('is Desc');
    };

    const onMessageEvent = (value: any, data: MessagetTypeDto) => {
      dispatch(addMessage(data));
      if (id !== data.userId) {
        const runNotAudio = new Audio('/sound/pongster.mp3');
        runNotAudio.play();
      }
    };
    const onAddNewUser = (data: userRoomDto) => {
      dispatch(addNewUser(data));
    };
    const onAddNewRoom = (data: RoomsDto) => {
      dispatch(createNewRoomSlice(data));
    };
    const onGlobalAdd = (data: any) => {
      if (id === data.userId) {
        dispatch(createNewRoomSlice(data));
        const runNotAudio = new Audio('/sound/new1.mp3');
        runNotAudio.play();
      }
    };

    const onRemoveUser = (data: userRoomDto) => {
      dispatch(removeUserRoom({ id: data.userId, roomId: data.roomId }));
      dispatch(setFoundRoom(false));
      dispatch(removeRoom(data.id));
    };
    const onRemoveRoomdata = (data: userRoomDto) => {
      dispatch(removeRoom(data.id));
    };

    const onmakeAdmin = (data: RoomMakeUser) => {
      dispatch(updateStutusUserRoom(data.userId));
      if (id === data.userId && !data.type!)
        toast.info(`you are now as admin as room ${data.name}`);
    };
    const onMuteUser = (data: RoomMakeUser) => {
      dispatch(muteUser(data));
    };

    socket.on('totyping', (client, data) => {
      if (roomid !== data.roomId) return
      dispatch(settyping(data.user));
      let timeOutId: any = null;
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        dispatch(settyping(''));
      }, 2500);
    });

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('messages', onMessageEvent);
    socket.on('notify', onAddNewUser);
    socket.on('removedUser', onRemoveUser);
    socket.on('addedRoom', onAddNewRoom);
    socket.on('getRoom', onGlobalAdd);
    socket.on('removeRoom', onRemoveRoomdata);
    socket.on('addedAdmin', onmakeAdmin);
    socket.on('isMuted', onMuteUser);
    return () => {
      socket.off('addedRoom', onmakeAdmin);
      socket.off('messages', onMessageEvent);
      socket.off('notify', onAddNewUser);
      socket.off('removedUser', onRemoveUser);
      socket.off('totyping', onRemoveUser);
      socket.off('isMuted', onMuteUser);
      dispatch(fetchMessage([]));
      dispatch(lockedAction(false));
      dispatch(setFoundRoom(false));
    };
  }, [id]);

  if (
    pathname === '/login' ||
    pathname === '/game' ||
    pathname === '/two-factor-vrification'
  ) {
    return (
      <html lang="en">
        <body className={`${className}`}>{chil}</body>
      </html>
    );
  }
  const CloseButton = ({ closeToast }: any) => (
    <div
      className="flex items-center rounded-full w-5 h-5 bg-[#a3a3a3] justify-center mt-3 p-1"
      onClick={closeToast}
    >
    <X color='white'/>
    </div>
  );
  const Slider = cssTransition({
    enter: "slideInUp",
    exit: "slideOutDown",
    collapseDuration: 300,
  });

  return (
    <html lang="en">
      <body className={`${className} flex text-white`}>
        <SideBar />
        <ToastContainer
          position="bottom-right"
          transition={Slider}
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          draggable
          limit={2}
          rtl={false}
          theme="light"
          closeButton={CloseButton}
          enableMultiContainer={false}
        />

        <main className="bg-dark-100 w-screen min-h-screen flex flex-col md:ml-64">
          <NavBar />
          <div className="p-4 sm:p-8">
            <Suspense fallback={<Loader2 />}>{chil}</Suspense>

            <ChatBox
              firstName="hah"
              lastLogin="shsh"
              lastName="sjjs"
              Avatar="/img/doge.jpg"
              bio="sjhs"
            />
          </div>
        </main>
      </body>
    </html>
  );
}

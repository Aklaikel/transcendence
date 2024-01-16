'use client';
import Icon from '@/components/icon/Icon';
import { postData } from '@/data/fetchData';
import { removeRoom } from '@/redux_toolkit/rooms/roomsRedux';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { Variants, motion } from 'framer-motion';
import socket from '@/plugins/socket';
import { toast } from 'react-toastify';

interface boxSettingProps {
  isOpen: boolean;
  setSwitched: (switched: string) => void;
  roomId: number;
}

export const BoxChat = ({ isOpen, setSwitched, roomId }: boxSettingProps) => {
  const route = useRouter();
  const userId = useSelector((state: any) => state.auth.id);
  const userRoom = useSelector((state: any) => state.rooms.userRoom);
  const dispatch = useDispatch();

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const leaveRoom = () => {
    postData('/join/leave', {
      userId: userId,
      roomId: roomId,
    })
      .then((res: any) => {
        if (res) route.push('channels');
        else toast.info('Error leave room');
        socket.emit('removeUser', res.data);
        dispatch(removeRoom(res.data.id));
      })
      .catch((err) => {
        toast.error('Error leave room');
      });
  };
  return (
    <motion.div
      className="z-10 rounded-lg absolute right-1 top-8 bg-dark w-48 sm:64 p-3 space-y-3 text-white/70 text-xs sm:text-1xl font-semibold"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.ul
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-3"
      >

        <motion.li variants={item}>
          <button
            onClick={() => setSwitched('member')}
            className="md:hidden flex p-3 space-x-2 items-center bg-green/20 w-full h-10 rounded-md hover:bg-dark-200"
          >
            <Icon name="Group.svg" width={25} /> <span>Memebers (6)</span>
          </button>
        </motion.li>

        {
            userRoom.map((ele: any) => ele.userId).indexOf(userId) !== -1 && 
        userRoom[userRoom.map((ele: any) => ele.userId).indexOf(userId)]
          .isadmin! ? (
          <>
            <motion.li variants={item}>
              <button
                className=" flex p-3 space-x-2 items-center bg-green/20 w-full h-10 rounded-md hover:bg-dark-200"
                onClick={() => setSwitched('edit')}
              >
                <Icon name="edit.svg" width={25} /> <span>Edit room</span>
              </button>
            </motion.li>
            <motion.li variants={item}>
              <button
                className=" flex p-3 space-x-2 items-center bg-green/20 w-full h-10 rounded-md hover:bg-dark-200"
                onClick={() => setSwitched('block')}
              >
                <Icon name="edit.svg" width={25} /> <span>Block list</span>
              </button>
            </motion.li>
          </>
        ) : null}

        <motion.li variants={item}>
          <button
            className=" flex p-3 space-x-2 items-center bg-green/20 w-full h-10 rounded-md hover:bg-dark-200"
            onClick={() => setSwitched('invite')}
          >
            <Icon name="invite.svg" width={25} /> <span>Invite</span>
          </button>
        </motion.li>

        <motion.li variants={item}>
          <button
            className=" flex p-3 space-x-2 items-center bg-green/20 w-full h-10 rounded-md hover:bg-dark-200"
            onClick={leaveRoom}
          >
            <Icon name="leave.svg" width={25} /> <span>Leave room</span>
          </button>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};

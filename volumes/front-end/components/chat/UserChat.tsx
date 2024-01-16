'use client';
import Image from 'next/image';
import Icon from '../icon/Icon';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Cog, VolumeX } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { muteUser } from '@/redux_toolkit/rooms/roomsRedux';
interface MemberChatProps {
  username: string;
  id: number;
  image: string;
  type: string;
  isOnline: boolean;
  isAdmin: boolean;
  roomId: number;
  setShowMembers: (para: boolean) => void;
  setUpate: (
    roomId: number,
    userId: number,
    image: string,
    isAdmin: boolean,
  ) => void;
  mute: string;
  owner: number;
}

const UserChat: React.FC<MemberChatProps> = ({
  id,
  username,
  image,
  owner,
  type,
  isOnline,
  isAdmin,
  roomId,
  setShowMembers,
  setUpate,
  mute,
}: MemberChatProps) => {
  const userId = useSelector((state: any) => state.auth.id);
  const userRoom = useSelector((state: any) => state.rooms.userRoom);
  let countDowntimer = parseInt(mute) - Math.floor(Date.now() / 1000);
  //   useEffect(() => {
  //     if (countDowntimer < 0) {
  //       axios
  //         .post('/join/checkmute', {
  //           userId: id,
  //           roomId: roomId,
  //         })
  //         .then(() => {
  //           mute = '0';
  //         });
  //     }
  //   }, [countDowntimer]);
  

  return (
    <div className="flex w-full p-2 items-center">
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.3 }}>
        <Image
          src={image}
          alt="image"
          width={50}
          height={50}
          className=" rounded-full border-[1.5px] border-green/50"
        />
      </motion.div>
      <>
        <div className="mx-2.5 flex-1">
          <Link
            href="/"
            title={username}
            className=" pr-1 w-[100px] font-semibold truncate text-ellipsis  overflow-hidden"
          >
            {username}
          </Link>
          <p title={type} className="text-sm text-white/40 ">
            {type}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          {countDowntimer > 0 ? <VolumeX size={20} color="red" /> : null}
          {userRoom.map((ele: any) => ele.userId).indexOf(userId) !== -1 &&
          userRoom[userRoom.map((ele: any) => ele.userId).indexOf(userId)]
            .isadmin &&
          userId !== id &&
          id !== owner ? (
            <button
              onClick={() => {
                setShowMembers(false);
                setUpate(roomId, id, image, isAdmin);
              }}
            >
              <Cog width={15} />
            </button>
          ) : null}

          <Icon name={`${isOnline ? 'online.svg' : 'ofline.svg'}`} width={10} />
        </div>
      </>
    </div>
  );
};

export default UserChat;

'use client';

import React, { useState, forwardRef } from 'react';
import { Loader2, Check, Plus, X } from 'lucide-react';
import Image from 'next/image';

import { useInput } from '@/hooks/customHooks';

// import CardProps from '@/types/CardRoom'

interface CardProps {
  ref?: React.Ref<HTMLDivElement>;
  name: string;
  description: string;
  avatar: string;
  type: string;
}

interface JoinProps {
  loading: boolean;
  joinRoom: () => void;
  joined: boolean;
  codeError: boolean;
}

function JoinButton({
  loading,
  joinRoom,
}: {
  loading: boolean;
  joinRoom: () => void;
}) {
  return (
    <button
      className="flex items-center bg-[#644DEA] font-medium w-full h-full justify-center rounded-lg"
      onClick={joinRoom}
      disabled={!loading}
    >
      {loading ? (
        <>
          Join <Plus className="ml-2" />
        </>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </button>
  );
}

function JoinFailed() {
  return (
    <button className="flex items-center bg-[#F87171] font-medium w-full h-full justify-center rounded-lg">
      Failed <X className="ml-2" />
    </button>
  );
}

function JoinedSuccess() {
  return (
    <button className="flex items-center bg-[#53D397] font-medium w-full h-full justify-center rounded-lg">
      Joined <Check className="ml-2" />
    </button>
  );
}

function Join({ loading, joinRoom, joined, codeError }: JoinProps) {
  return (
    <>
      {!joined ? (
        !codeError ? (
          <JoinButton loading={loading} joinRoom={joinRoom} />
        ) : (
          <JoinFailed />
        )
      ) : (
        <JoinedSuccess />
      )}
    </>
  );
}

const Card = forwardRef(
  ({ name, description, avatar, type }: CardProps, ref) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [joined, setJoined] = useState<boolean>(false);
    const [codeError, setCodeError] = useState<boolean>(false);

    const [roomCode, setRoomCode, onChangeCode] = useInput<string>('');

    const joinRoom = () => {
      setLoading(false);

      if (type === 'protected') {
        if (roomCode === '1234') {
          setJoined(true);
        } else {
          setCodeError(true);
          setRoomCode('');

          setTimeout(() => {
            setLoading(true);
            setCodeError(false);
          }, 2000);

          return;
        }
      }

      setTimeout(() => {
        setJoined(true);
      }, 2000);
    };

    return (
      <div
        ref={ref}
        className="bg-[#012140] rounded-2xl p-6 text-[#EDEDED] flex flex-col justify-between"
      >
        <div className="h-[200px] relative">
          <Image
            src={avatar}
            width={500}
            height={500}
            alt="#"
            className="w-full h-full object-cover rounded-xl"
            priority={true}
          />
          <span className="uppercase absolute bottom-[10px] right-[15px] bg-gradient-to-r from-[#282950] to-[#644DEA] px-4 py-2 rounded-lg  font-medium">
            {type}
          </span>
        </div>
        <div className="mt-8 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-medium ">{name}</h3>
            <p className="mt-2 text-[#707D93] break-words">
              {description.length > 100
                ? description.substring(0, 100)
                : description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4 gap-4 h-[50px]">
            {type === 'protected' && !joined ? (
              <>
                <input
                  type="password"
                  placeholder="Invite Code"
                  className="w-full h-full rounded-lg bg-[#1A1D2A] text-[#707D93] px-4 py-2 outline-[#707D93] focus:outline-double"
                  value={roomCode}
                  onChange={onChangeCode}
                  autoComplete="new-password"
                />
              </>
            ) : null}

            <Join
              loading={loading}
              joinRoom={joinRoom}
              joined={joined}
              codeError={codeError}
            />
          </div>
        </div>
      </div>
    );
  },
);

export default Card;

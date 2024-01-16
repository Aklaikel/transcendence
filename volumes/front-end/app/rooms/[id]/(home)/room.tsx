'use client';
import { ChatRoom } from '@/components/rooms/chat/ChatRoom';
import { MembersRoom } from '@/components/rooms/chat/MembersRom';
import { useParams } from 'next/navigation';

export const LaunchRoom = () => {
  const { id } = useParams();
  return (
    <div className="flex gap-2 h-[calc(100vh-150px)] overflow-hidden">
      <div className="bg-dark-200 w-[500px] mx-5 lg:max-w-sm  hidden md:block">
        <MembersRoom />
      </div>
      <div className="bg-dark-200 w-full">
        <ChatRoom />
      </div>
    </div>
  );
};

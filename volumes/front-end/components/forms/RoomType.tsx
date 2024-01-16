'use client';

import Icon from '../icon/Icon';

interface inputProps {
  typeRoom: string;
  setTypeRoom: (typeRoom: string) => void;
}

export const RoomType = ({ typeRoom, setTypeRoom }: inputProps) => {
  type forms = {
    name: string;
    icon: string;
  };
  const inputForm = [
    {
      name: 'public',
      icon: 'public.svg',
    },
    {
      name: 'private',
      icon: 'private.svg',
    },
    {
      name: 'protected',
      icon: 'password.svg',
    },
  ];

  const elmentForm = inputForm.map((Element: forms) => {
    return (
      <div
        key={Element.name}
        className={`flex md:flex-col flex-row justify-center  items-center gap-5 md:gap:2 rounded-lg border  ${
          typeRoom === Element.name
            ? 'bg-dark-100/50 border-[#03C988]'
            : 'bg-dark-100 border-white'
        }  w-full h-24 md:w-28 md:h-28 cursor-pointer font-medium first:justify-self-start last:justify-self-end`}
        onClick={() => setTypeRoom(Element.name)}
      >
        <Icon name={Element.icon} className='w-12 md:w-7' />
        <span className='text-2xl md:text-sm'>{Element.name}</span>
      </div>
    );
  });

  return (
    <div className="mt-8">
      <div className="w-full grid-cols-1 grid md:grid-cols-3  gap-3 md:gap-1  justify-items-center mb-6">
        {elmentForm}
      </div>
    </div>
  );
};
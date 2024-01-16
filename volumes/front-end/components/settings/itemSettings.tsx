// import Link from 'next/link';
// import Icon from '../icon/Icon';


// export default function ItemSettings({label,aloneOrNot}: {label: string,aloneOrNot: number})
// {
//     if (aloneOrNot === 0) {
//         if (label === "Profile") return (
//             <Link href={`/settings/profile`} className="bg-[#393A6C] w-[200px] h-[42px] flex justify-center items-center text-sm rounded relative ">
//                 <div className='absolute left-5'>
//                     <Icon name="ProfileSettingsIcon.svg" className='pointer-events-none'/>
//                 </div>
//                 <div className='flex justify-center items-center'>
//                     {label}
//                 </div>
//             </Link>
//         )
//         else if (label === "All Rooms") return (
    
//             <Link href={`/settings/allrooms`} className="bg-[#393A6C] w-[200px] h-[42px] flex justify-center items-center text-sm rounded relative">
//                 <div className='absolute left-5'>
//                     <Icon name="settingsAvatarAll.svg" className='pointer-events-none'/>
//                 </div>
//                 <div className='flex justify-center items-center'>
//                     {label}
//                 </div>
//             </Link>
//         )
//         return (
//             <Link href={`/settings/blocklist`} className="bg-[#393A6C] w-[200px] h-[42px] flex justify-center items-center text-sm rounded relative">
//                 <div className='absolute left-5'>
//                     <Icon name="blockSettingsIcon.svg" className='pointer-events-none'/>
//                 </div>
//                 <div className='flex justify-center items-center'>
//                     {label}
//                 </div>
//             </Link>
//         );
//         }
//     else {
//     if (label === "Profile") return (
//         <Link href={`/settings/profile`} className="md:bg-[#393A6C] w-[60px] min-[950px]:w-[200px] h-[42px] flex justify-center items-center text-sm rounded relative ">
//             <div className='absolute  min-[950px]:left-5'>
//                 <Icon name="ProfileSettingsIcon.svg" className='pointer-events-none'/>
//             </div>
//             <div className='hidden min-[950px]:flex justify-center items-center'>
//                 {label}
//             </div>
//         </Link>
//     )
//     else if (label === "All Rooms") return (

//         <Link href={`/settings/allrooms`} className="md:bg-[#393A6C] w-[60px] min-[950px]:w-[200px] h-[42px] flex justify-center items-center text-sm rounded relative">
//             <div className='absolute min-[950px]:left-5'>
//                 <Icon name="settingsAvatarAll.svg" className='pointer-events-none'/>
//             </div>
//             <div className='hidden min-[950px]:flex justify-center items-center'>
//                 {label}
//             </div>
//         </Link>
//     )
//     return (
//         <Link href={`/settings/blocklist`} className="md:bg-[#393A6C] w-[60px] min-[950px]:w-[200px] h-[42px] flex justify-center items-center text-sm rounded relative">
//             <div className='absolute  min-[950px]:left-5'>
//                 <Icon name="blockSettingsIcon.svg" className='pointer-events-none'/>
//             </div>
//             <div className='hidden min-[950px]:flex justify-center items-center'>
//                 {label}
//             </div>
//         </Link>
//     );
//     }
// }

import Link from 'next/link';
import Icon from '../icon/Icon';

export default function ItemSettings({ label, aloneOrNot }: { label: string, aloneOrNot: number }) {
  const linkProps = {
    className: aloneOrNot === 0 ? "bg-[#393A6C] w-[200px] h-[42px] flex justify-center items-center text-sm rounded relative" : "md:bg-[#393A6C] w-[60px] min-[950px]:w-[200px] h-[42px] flex justify-center items-center text-sm rounded relative"
  };

  const iconProps = {
    className: 'pointer-events-none',
    name: getIconName(label)
  };

  const isVisible = aloneOrNot === 0 ? "flex"  : "hidden min-[950px]:flex";
  const isVisOrNot = aloneOrNot === 0 ? "left-5"  : "min-[950px]:left-5";
  
  return (
    <Link href={getLinkHref(label)} {...linkProps}>
      <div className={'absolute ' + isVisOrNot}>
        <Icon {...iconProps} />
      </div>
      <div className={isVisible + ' justify-center items-center'}>
        {label}
      </div>
    </Link>
  );
}

function getLinkHref(label: string) {
  if (label === "Profile") return "/settings/profile";
  if (label === "All Rooms") return "/settings/allrooms";
  if (label === "Themes") return "/settings/themes";
  if (label === "Two-Factor") return "/settings/twofactor";
  return "/settings/blocklist";
}

function getIconName(label: string) {
  if (label === "Profile") return "ProfileSettingsIcon.svg";
  if (label === "All Rooms") return "settingsAvatarAll.svg";
  return "blockSettingsIcon.svg";
}
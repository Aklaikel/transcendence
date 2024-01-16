'use client';

import React, { useState } from 'react';

import Settings from '@/components/settings/settings'

import Image from 'next/image'

interface Props {
    firstName: string,
    secondName: string,
	firstNameValue: string
	secondNameValue: string,
}

const Profile =()=> {

   return (
   	<div className=''>
		<div className="p-5 text-xl text-semibold tracking-wider hidden sm:block">
			Settings
		</div>
		<div className='flex justify-start w-full h-full p-0 overflow-hidden relative rounded-sm space-x-0 md:space-x-3 max-w-[1300px]'>
			<Settings  index={1}/>
			<div className='w-full bg-[#393A6C] flex flex-col justify-around space-y-6 relative items-center p-2 md:p-10 md:rounded'>
				<div className='w-full flex gap-4 md:gap-8 flex-col-reverse min-[1268px]:flex-row justify-around md:justify-start items-start  space-y-2 md:space-y-0 mb-4'>
					
					
					<div className='w-full sm:max-w-[300px] min-[1268px]:w-[20%] object-cover flex flex-col justify-center items-center space-y-1'>
						<div className='w-full'>
							<Image src="/images/profilePhoto.png" width={100} height={100} alt='#' className='w-full h-full object-cover'/>
						</div>
						<div className='w-full'>
							<button className='w-full py-2 text-md font-medium flex justify-center items-center bg-dark-100 break-words whitespace-nowrap hover:bg-dark min-[950px]:text-xs'>Change profile picture</button>
						</div>
					</div>


					<div className="w-full min-[1268px]:w-[80%] flex flex-row-reverse relative object-cover h-[200px] md:h-full">
							<Image src="/images/coverProfile.png"  width={100} height={100} alt='#' className='w-full h-full'/>
							<div className='absolute top-2 right-2'>
								<button className='flex justify-center items-center rounded text-xs font-medium text-white bg-dark-100 px-6 py-2 hover:bg-dark'>
									Change
								</button>
						</div>
					</div>

				</div>



				<ItemProfile firstName='Username' secondName='Email Address' firstNameValue='matef' secondNameValue='test@gmail.com'/>
				<ItemProfile firstName='First Name' secondName='Last Name' firstNameValue='mohamed' secondNameValue='atef'/>
				<ItemProfile firstName='Country' secondName='Gendre' firstNameValue='canada' secondNameValue='male'/>




				<div className='w-full flex justify-center md:justify-start'>
					<button className='w-full md:w-[30%] min-w-[100px] bg-[#3CCF4E] hover:bg-[#3CCF4E]/[.9] text-md px-4 py-2 rounded flex justify-center items-center md:max-w-[130px]'>
						Update
					</button>
				</div>
			</div>
		</div>
	</div>
)
}
export default Profile;

const ItemProfile = ({firstName, secondName, firstNameValue, secondNameValue}: Props) => {

	const [firstNameInput, setFirstNameInput] = useState(firstNameValue);
	const [secondNameInput, setSecondNameInput] = useState(secondNameValue);

	const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFirstNameInput(e.target.value);
	};

	const handleSecondNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSecondNameInput(e.target.value);
	};

	return (
		<div className='w-full flex flex-col md:flex-row justify-center md:justify-between items-start space-y-4 md:space-y-0 text-md'>
			<div className='w-full md:w-[48%]'>
				<label htmlFor={firstName.replace(' ','_').toLowerCase()} className='block mb-1'>{firstName}</label>
				<input type="text" className='w-full h-[40px] bg-[#26274F] py-2 px-4 rounded text-[#FFFFFF7F] placeholder-[#FFFFFFF] outline-none' value={firstNameInput} onChange={ handleFirstNameChange }/>
			</div>
			<div className='w-full md:w-[48%]'>
				<label htmlFor={secondName.replace(' ','_').toLowerCase()} className='block mb-1'>{secondName}</label>
				<input type="text" id={secondName.replace(' ','_').toLowerCase()} className='w-full h-[40px] placeholder-green bg-[#26274F] py-2 px-4 rounded text-[#FFFFFF7F] placeholder-[#FFFFFFF] outline-none' value={secondNameInput} onChange={handleSecondNameChange} />
			</div>
		</div>
	);
}
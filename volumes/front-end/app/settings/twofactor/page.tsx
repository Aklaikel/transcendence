import React from 'react'

import Settings from '@/components/settings/settings'

import Icon from '@/components/icon/Icon'

export default function page() {
  return (

    <div className=''>
		<div className="p-5 text-xl text-semibold tracking-wider hidden sm:block">
			Settings
		</div>
		<div className='flex justify-start w-full h-full p-0 overflow-hidden relative rounded-sm space-x-0 md:space-x-3 max-w-[1300px]'>
			<Settings  index={1}/>
			
            <div>
                <Icon name="google_logo.svg" />
                {/* <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, obcaecati.
                </p> */}
                two factor
            </div>

		</div>
	</div>
  )
}

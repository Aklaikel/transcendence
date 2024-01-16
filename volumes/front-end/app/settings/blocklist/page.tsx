import Icon from '@/components/icon/Icon'
import Settings from '@/components/settings/settings'

const BlockList =()=> {
   return (
    <div className=''>
        <div className="p-5 text-xl text-semibold tracking-wider hidden sm:block">
            Settings
        </div>
    <div className='flex justify-start w-full h-full p-0 overflow-hidden relative rounded-sm space-x-0 md:space-x-3'>
        <Settings  index={1}/>
        <div className='space-y-5 bg-[#393A6C] flex flex-col w-full max-w-[900px] h-full md:rounded py-2 md:py-10 px-5 md:px-20'>
            <div className='py-2' >
                <h2 className='font-semibold text-3xl mb-4'>
                    Blocked Members <br/>
                </h2>
                <span className='max-w-[491px] text-[#737E97] text-xs md:text-sm font-medium leading-3'>
                    Blocked users cannot leave notes on your profile or send you messages. They cannot challenge you to games or accept your open challenges, and they will not be paired with you automatically.
                    (You could, however, be paired with a blocked member during Tournament play.)
                </span>
            </div>
            <div className='w-full h-full space-y-3 select-none'>
                <div className='flex space-x-1 min-[300px]:space-x-4 w-full'>
                    <div className='flex relative flex-shrink'>
                        <input type="text" className='w-[100%] md:w-[300px] outline-none py-3 bg-[#26274F] px-6 rounded text-white text-sm placeholder-white' placeholder="Search members" />

                        {/* add here the serch result of top 5 */}
                    </div>
					<div className='bg-[#26274F] rounded text-white text-sm px-4 py-2'>
						<button className='h-full'>Block</button>
					</div>
                </div>
				<div className='space-y-1 select-none flex flex-col'>
					<span className='w-[182px] h-[30px] font-semibold text-lg select-none'>
						block list<br/>
					</span>
					<div className='flex justify-between w-[80%] min-w-[132px]'>
						<div className='relative'>
							youmer
						</div>
						<div className='relative'>
							<button className='text-sm'>
								Unblock
							</button>
						</div>
					</div>
				</div>
            </div>
        </div>
    </div>
    </div>
   )
}
export default BlockList;
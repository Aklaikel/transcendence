import Icon from "@/components/icon/Icon";

import Image from "next/image";

export function Profile() {
    return (
        <div className="flex flex-col items-center justify-center p-10 w-full  h-[550px] font-semibold bg-dark-200 rounded-l">
            <span>Name</span>
            <div className="relative inline-block">
                <div className="absolute -bottom-[10px] left-0 w-full flex justify-center items-end animate-rotate-once">
                    <Icon name="aklaikel/crystal.svg" height={100} width={100} />
                </div>
                <div  className="h-[132px] w-[132px] min-[425px]:w-[200px] min-[425px]:h-[200px]">
                    <Image width={100} height={100} src="/images/profilePhoto.png" alt="profile" priority={true} className="mt-4 object-cover h-full w-full"/>
                </div>
            </div>
            <div className="mt-10 ">
                <div>Rank :      Craystal</div>
                <div className="flex flex-row items-center justify-center">
                    <Icon name="aklaikel/Group.svg" height={20} width={20} />
                    <span className="ml-2"> 100</span>
                </div>
            </div>
            <hr className="border-b-1 border-[#40586F] border-[1px] mt-5 w-full" />
            <div className="mt-10 text-md w-full space-y-3">
                <div className="flex justify-between w-full items-center">
                    <div>Percentile:</div>
                    <div>92.99%</div>
                </div>
                <div className="flex justify-between">
                    <div>Record:</div>
                    <div>98/7/5</div>
                </div>
                <div className="flex justify-between items-center">
                    <div>Player:</div>
                    <div>1250</div>
                </div>
            </div>
        </div>
    )
}
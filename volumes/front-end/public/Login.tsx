// import Hero from "../public/hero.svg"


import Image from "next/image";




export default function Login(){
    return(
        <div className="flex h-screen ">
            <div className="w-full h-full bg-[url('/hero.svg')] bg-cover  max-sm:hidden"></div>

            <div className="flex flex-col justify-between bg-[#ADF0D1] px-20 py-80 text-center md:text-left items-center md:items-start">
                <div className="">
                    <Image src="/logo.svg" width={100} height={50} alt='/'/>
                </div>
                <div className="">
                    <h5 className=" font-bold text-3xl ">Log in</h5>
                    <p className="py-5  max-sm:w-full ">
                        Join us now and experience the ultimate excitement of PigPong!.
                    </p>

                    <button className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 px-10 m-auto md:m-0 bg-[#00203F] h-[60px] rounded-[50px] text-white font-blod" >
                        <Image src="/logo42.svg" width={30} height={30} alt="42 logo" className=""/>
                        <span className="ml-2 ">sign in with 42</span>
                    </button>
                </div>
                <div></div>
            </div>

            </div>
    )
}
'use client'
import { toast } from 'react-toastify';
import axios from '../../api/axiosInstances';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '@/redux_toolkit/auth';

const FirstTime = () => {
    const auth = useSelector((state: any)=> state.auth)
    const dispatch = useDispatch()
    const [name, setname] = useState<string| null>(null)
  const updateInfo = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    axios.post('/user/update',{
        UserName: name,
        userId: auth.id
    } ).then((res)=>{
        dispatch(authLogin(res.data))
    }).catch(()=>{
        toast.error('Error change yOur info try again')
    })
  };
  return (
    <div className="bg-dark p-2 ">
      <h3 className="m-2"> change your information :</h3>
      <form onSubmit={(e: any)=> updateInfo(e)}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name=""
            id=""
            className="p-2 bg-dark-100 w-full"
            placeholder="username"
            onChange={(e)=> setname(e.target.value)}
          />
          <div className="grid place-items-center">
            <button className="bg-green-100 p-2 w-[30%] rounded-md">
              update Info
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FirstTime;

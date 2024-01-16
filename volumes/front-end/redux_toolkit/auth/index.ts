import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

import { userInfo } from 'os';

export interface userInfo {
  UserName: string;
  id: number;
  token: string;
  avatar: string;
  bio?: string;
  firstTime: boolean;
  isAuth: boolean
}

const initialState: userInfo = {
  UserName: '',
  id: 0,
  token: '',
  avatar: '/public/images/profile.jpg',
  bio: '',
  firstTime: true,
  isAuth: false
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    authLogin: (state, action : PayloadAction<any>) =>{
        state.UserName =  action.payload.UserName
        state.id =  action.payload.id
        state.avatar =  action.payload.avatar
        state.bio =  action.payload.bio
        state.token =  action.payload.token
        state.firstTime = action.payload.firstTime
        state.isAuth  = true
    },
    removeAuth : (state)=>{
        state.isAuth = false
    }
   
  },
});

export const {authLogin} = authSlice.actions;

export default authSlice.reducer;

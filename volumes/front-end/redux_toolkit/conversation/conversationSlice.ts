
'use client '

import { PayloadAction, createSlice } from '@reduxjs/toolkit'


export interface ConversationState {
    id: string,
    avatar: string,
    fullName: string,
    bio: string,
    chatId: number,
}

const initialState: ConversationState = {
    id: '',
    avatar: '',
    fullName: '',
    bio: '',
    chatId: 0,

}

export const conversation = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.id = action.payload.id
        state.avatar = action.payload.avatar
        state.fullName = action.payload.fullName
        state.bio = action.payload.bio

    },
    setChanellId: (state, action :PayloadAction<number>)=>{
      state.chatId = action.payload

    }
  },
})

export const { setUser, setChanellId } = conversation.actions

export default conversation.reducer
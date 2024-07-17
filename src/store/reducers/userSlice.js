"use client";
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const reloadUser = createAction("reloadUser");
export const loginUser = createAsyncThunk('user/loginUser', async (user) => {
  const response = await axios.post('https://dummyjson.com/auth/login', user);
  if (response.data.message) {
    toast.error(response.data.message);
  }
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(reloadUser, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;


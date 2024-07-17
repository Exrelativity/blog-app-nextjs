import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import commentReducer from './reducers/commentSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    comments: commentReducer,
  },
});

export default store;

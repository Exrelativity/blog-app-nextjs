import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch comments for a specific post
export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {
  const response = await axios.get(`https://dummyjson.com/posts/${postId}/comments`);
  return response.data.comments;
});

// Add a new comment
export const addComment = createAsyncThunk('comments/addComment', async ({ postId, comment }) => {
  const response = await axios.post(`https://dummyjson.com/comments/add`, { postId, body: comment });
  return response.data;
});

// Update a comment
export const updateComment = createAsyncThunk('comments/updateComment', async ({ commentId, comment }) => {
  const response = await axios.put(`https://dummyjson.com/comments/${commentId}`, { body: comment });
  return response.data;
});

// Delete a comment
export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId) => {
  await axios.delete(`https://dummyjson.com/comments/${commentId}`);
  return commentId;
});

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(comment => comment.id === action.payload.id);
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(comment => comment.id !== action.payload);
      });
  },
});

export default commentSlice.reducer;

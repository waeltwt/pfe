import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ADD Post
export const addNewPost = createAsyncThunk(
  'post/addNewPost',
  async (info, { rejectWithValue, dispatch }) => {
    console.log(info);
    const formData = new FormData();
    //  formData.append('file', info.file)
    formData.append('info', JSON.stringify(info.postInfo));
    try {
      const res = await axios.post('http://localhost:5000/api/post/addpost', formData, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(getPosts());
      return res.data;
    } catch (error) {


      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);

// GET POST LIST
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get('http://localhost:5000/api/post');
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    postErrors: null,
    postsErrors: null,
    post: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.loading = false;
        state.postList = action.payload
        state.postErrors = null;
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.loading = false;
        state.postErrors = action.payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.postList = action.payload
        state.postsErrors = null;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.postsErrors = action.payload;
      });
  },
});

export default postSlice.reducer;
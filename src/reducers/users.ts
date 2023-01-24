import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('https://fakestoreapi.com/users');
    return response.data;
});


export const postUsers = createAsyncThunk('users/postUsers', async (user: any) => {
    try {

        const data = {
            name: {
                firstname: user.firstname,
                lastname: user.lastname
            },
            email: user.email
        }

        console.log(user)

        const result = await axios.post('https://fakestoreapi.com/users', data);

        console.log(data)
    } catch (error) {
        throw error;
    }
});

export interface User {
    id: number;
    email: string;
    name: {firstname: string, lastname: string};
    username: string;
  }
  
  export interface UsersState {
    data: User[];
    fetchUsersStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    postUsersStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

  const initialState: UsersState = {
    data: [],
    fetchUsersStatus: 'idle',
    postUsersStatus: 'idle',
    error: null,
  };
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.fetchUsersStatus = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                    state.fetchUsersStatus = 'succeeded';
                    state.data = action.payload;
                })
                .addCase(fetchUsers.rejected, (state, action) => {
                    state.fetchUsersStatus = 'failed';
                    state.error = action.error.message;
                })
            .addCase(postUsers.pending, (state) => {
                state.postUsersStatus = 'loading';
            })
            .addCase(postUsers.fulfilled, (state, action) => {
                    state.postUsersStatus = 'succeeded';                    
                })
                .addCase(postUsers.rejected, (state, action) => {
                    state.postUsersStatus = 'failed';
                    state.error = action.error.message;
                })
            }
        });

export const {  } = userSlice.actions;
export const users =  userSlice.reducer;
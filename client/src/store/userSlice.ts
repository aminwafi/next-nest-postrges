import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interface/User';

interface UserState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://reqres.in/api/users');
  const result = await response.json();
  return result.data as User[];
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    filterUsers: (state) => {
      state.filteredUsers = state.users.filter(
        user => user.first_name.startsWith('G') || user.last_name.startsWith('W')
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload.filter(
          user => user.first_name.startsWith('G') || user.last_name.startsWith('W')
        );
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { filterUsers } = userSlice.actions;

export default userSlice.reducer;

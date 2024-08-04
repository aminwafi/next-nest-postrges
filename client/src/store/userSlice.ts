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
  let users: User[] = [];

  var response = await fetch('https://reqres.in/api/users');
  var result = await response.json();
  users = users.concat(result.data);

  while (result.page < result.total_pages) {
    response = await fetch(`https://reqres.in/api/users?page=${result.page + 1}`);
    result = await response.json();

    users = users.concat(result.data);

    result.page = result.page + 1;
  }

  return users;
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  users: string[];
}

const initialState: UserState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<string>) {
      state.users.push(action.payload);
    },
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;

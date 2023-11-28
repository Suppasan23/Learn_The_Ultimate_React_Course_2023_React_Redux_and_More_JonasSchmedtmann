import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: 'Shrek',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducer: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

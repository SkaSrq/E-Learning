import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const saveUser = createAsyncThunk("user/save", async (user) => {
  return Promise.resolve({ params: user });
});
export const removeUser = createAsyncThunk("user/remove", async (user) => {
  return Promise.resolve();
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: undefined,
    name: undefined,
    email: undefined,
    token: undefined,
    profilePicture: undefined
  },
  extraReducers: {
    [saveUser.fulfilled]: (state, action) => {
      state.id = action.payload.params.id;
      state.name = action.payload.params.name;
      state.email = action.payload.params.email;
      state.token = action.payload.params.token;
      state.profilePicture = action.payload.params.profilePicture;
    },
    [removeUser.fulfilled]: (state, action) => {
      state.id = undefined;
      state.name = undefined;
      state.email = undefined;
      state.token = undefined;
      state.profilePicture = undefined;
    }
  }
});
export default userSlice.reducer;

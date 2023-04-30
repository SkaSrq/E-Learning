import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const loadingStarted = createAsyncThunk("loadingStarted", async () => {
  return Promise.resolve();
});
export const loadingEnd = createAsyncThunk("loadingEnd", async () => {
  return Promise.resolve();
});

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    status: false
  },
  extraReducers: {
    [loadingStarted.fulfilled]: (state, action) => {
      state.status = true;
    },
    [loadingEnd.fulfilled]: (state, action) => {
      state.status = false;
    }
  }
});
export default loadingSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const searched = createAsyncThunk(
  "searched",
  async ({ searchQuery, searchResults }) => {
    return Promise.resolve({
      searchQuery: searchQuery,
      searchResults: searchResults
    });
  }
);
export const searchCancel = createAsyncThunk("searchCancel", async () => {
  return Promise.resolve();
});

const searchSlice = createSlice({
  name: "search",
  initialState: {
    status: false,
    searchedQuery: undefined,
    searchResults: []
  },
  extraReducers: {
    [searched.fulfilled]: (state, action) => {
      state.status = true;
      state.searchedQuery = action.payload.searchQuery;
      state.searchResults = action.payload.searchResults;
    },
    [searchCancel.fulfilled]: (state, action) => {
      state.status = false;
      state.searchedQuery = undefined;
      state.searchResults = [];
    }
  }
});
export default searchSlice.reducer;

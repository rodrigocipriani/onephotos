import { createSlice } from "@reduxjs/toolkit";

const syncSlice = createSlice({
  name: "syncSlice",
  initialState: {
    syncSlug: null,
    loading: {}
  },
  reducers: {
    setSyncSlug: (state, action) => {
      state.syncSlug = action.payload;
    }
  }
});

export const syncSliceActions = syncSlice.actions;

export default syncSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    loading: {}
  },
  reducers: {}
});

export const appSliceActions = appSlice.actions;

export default appSlice.reducer;

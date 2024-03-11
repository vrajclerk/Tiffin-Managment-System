import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foods:[]
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: { 
    initialDataRequest: (state, action) => {
      state.loading = true;
    },
    initialDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    initialDataFail: (state) => {
      state.loading = false;
      state.data = undefined;
    },
  },
});
export const { initialDataRequest, initialDataSuccess, initialDataFail } =
  initialDataSlice.actions;

export default initialDataSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface MainPanelState {
  customerMode: boolean;
}

const initialState: MainPanelState = {
  customerMode: true,
};

export const mainPanelSlice = createSlice({
  name: "mainPanel",
  initialState,
  reducers: {
    toggleCustomerMode: (state) => {
      state.customerMode = !state.customerMode;
    },
  },
});

export const { toggleCustomerMode } = mainPanelSlice.actions;

export const selectCustomerMode = (state: RootState) =>
  state.mainPanel.customerMode;

export default mainPanelSlice.reducer;

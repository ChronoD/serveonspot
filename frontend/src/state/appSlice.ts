import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appointment, UserInfo } from "./dataTypes";
import type { RootState } from "./store";

// Define a type for the slice state
export interface AppState {
  customerMode: boolean;
  authenticationHeader: string | undefined;
  userInfo: UserInfo | undefined;
}

// Define the initial state using that type
const initialState: AppState = {
  customerMode: true,
  authenticationHeader: undefined,
  userInfo: undefined,
};

// const registerWithSpecialist = createAsyncThunk(
//   "users/fetchByIdStatus",
//   async (specialistId, thunkAPI) => {
//     const response = await registerAppointment(specialistId);
//     return response.data;
//   }
// );

export const appSlice = createSlice({
  name: "app",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleAppointmentMode: (state) => {
      state.customerMode = !state.customerMode;
    },
  },
});

export const { toggleAppointmentMode } = appSlice.actions;

export const selectAppointmentMode = (state: RootState) =>
  state.app.customerMode;

export default appSlice.reducer;

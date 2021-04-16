import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerAppointment } from "../functions/apiFunctions";
import { Appointment } from "./dataTypes";
import type { RootState } from "./store";

// Define a type for the slice state
interface AppState {
  postingAppointment: boolean;
  appointment: Appointment | undefined;
  appointmentError: Error | undefined;
  authenticationHeader: string | undefined;
  userAuthority: string | undefined;
}

// Define the initial state using that type
const initialState: AppState = {
  postingAppointment: false,
  appointment: undefined,
  appointmentError: undefined,
  authenticationHeader: undefined,
  userAuthority: undefined,
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
    postAppointment: (state) => {
      // state.value += 1;
    },
    decrement: (state) => {
      // state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAuthenticationHeader: (
      state,
      action: PayloadAction<{ header: string; authority: string }>
    ) => {
      const { header, authority } = action.payload;
      state.authenticationHeader = header;
      state.userAuthority = authority;
    },
    unsetAuthenticationHeader: (state, action: PayloadAction) => {
      state.authenticationHeader = undefined;
      state.userAuthority = undefined;
    },
  },
});

export const {
  decrement,
  setAuthenticationHeader,
  unsetAuthenticationHeader,
} = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuthenticationHeader = (state: RootState) =>
  state.app.authenticationHeader;

export default appSlice.reducer;

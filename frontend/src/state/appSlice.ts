import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerAppointment } from "../functions/apiFunctions";
import { Appointment } from "./dataTypes";
import type { RootState } from "./store";

// Define a type for the slice state
interface AppState {
  postingAppointment: boolean;
  appointment: Appointment | undefined;
  appointmentError: Error | undefined;
}

// Define the initial state using that type
const initialState: AppState = {
  postingAppointment: false,
  appointment: undefined,
  appointmentError: undefined,
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
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // state.value += action.payload;
    },
  },
});

export const { decrement, incrementByAmount } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectState = (state: RootState) => state.value;

export default appSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appointment, AppointmentInfo, Specialist } from "./dataTypes";
import type { RootState } from "./store";

// Define a type for the slice state
export interface CustomerState {
  gettingSpecialists: boolean;
  gettingSpecialistsError: Error | undefined;
  specialists: Specialist[] | undefined;
  postingAppointment: boolean;
  appointmentError: Error | undefined;
  appointmentInfo: AppointmentInfo | undefined;
  unregisteringAppointment: boolean;
  unregisteringAppointmentError: Error | undefined;
}

// Define the initial state using that type
const initialState: CustomerState = {
  gettingSpecialists: false,
  gettingSpecialistsError: undefined,
  specialists: undefined,
  postingAppointment: false,
  appointmentError: undefined,
  appointmentInfo: undefined,
  unregisteringAppointment: false,
  unregisteringAppointmentError: undefined,
};

// const registerWithSpecialist = createAsyncThunk(
//   "users/fetchByIdStatus",
//   async (specialistId, thunkAPI) => {
//     const response = await registerAppointment(specialistId);
//     return response.data;
//   }
// );

export const customerSlice = createSlice({
  name: "customer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    gettingSpecialists: (state) => {
      state.gettingSpecialists = true;
    },
    specialistsSuccess: (state, action: PayloadAction<Specialist[]>) => {
      state.gettingSpecialists = false;
      state.specialists = action.payload;
    },
    specialistsError: (state, action: PayloadAction<Error>) => {
      state.gettingSpecialists = false;
      state.appointmentError = action.payload;
    },
    postingAppointment: (state) => {
      state.postingAppointment = true;
    },
    postingAppointmentSuccess: (
      state,
      action: PayloadAction<AppointmentInfo>
    ) => {
      state.postingAppointment = false;
      state.appointmentInfo = action.payload;
    },
    postingAppointmentError: (state, action: PayloadAction<Error>) => {
      state.postingAppointment = false;
      state.appointmentError = action.payload;
    },
    unregistering: (state) => {
      state.unregisteringAppointment = true;
    },
    unregisteringSuccess: (state) => {
      state.appointmentInfo = undefined;
      state.unregisteringAppointment = false;
      state.unregisteringAppointmentError = undefined;
    },
    unregisteringError: (state, action: PayloadAction<Error>) => {
      state.unregisteringAppointment = false;
      state.unregisteringAppointmentError = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const {
  postingAppointment,
  postingAppointmentSuccess,
  postingAppointmentError,
  gettingSpecialists,
  specialistsSuccess,
  specialistsError,
  unregistering,
  unregisteringSuccess,
  unregisteringError,
} = customerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSpecialists = (state: RootState) =>
  state.customer.specialists;
export const selectAppointment = (state: RootState) =>
  state.customer.appointmentInfo;

export const selectPostingAppointmentStatus = (state: RootState) =>
  state.customer.postingAppointment;

export default customerSlice.reducer;

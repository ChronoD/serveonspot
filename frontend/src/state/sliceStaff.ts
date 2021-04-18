import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appointment, UserInfo } from "./dataTypes";
import type { RootState } from "./store";

// Define a type for the slice state
export interface StaffState {
  authenticationHeader: string | undefined;
  userInfo: UserInfo | undefined;
  updatingAppointment: boolean;
  updatingAppointmentError: Error | undefined;
  updatedAppointment: Appointment | undefined;
  appointments: Appointment[] | undefined;
  appointmentsError: Error | undefined;
}

// Define the initial state using that type
const initialState: StaffState = {
  authenticationHeader: undefined,
  userInfo: undefined,
  updatingAppointment: false,
  updatingAppointmentError: undefined,
  updatedAppointment: undefined,
  appointments: undefined,
  appointmentsError: undefined,
};

// const registerWithSpecialist = createAsyncThunk(
//   "users/fetchByIdStatus",
//   async (specialistId, thunkAPI) => {
//     const response = await registerAppointment(specialistId);
//     return response.data;
//   }
// );

export const staffSlice = createSlice({
  name: "staff",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload;
      state.appointmentsError = undefined;
    },
    setAppointmentsError: (state, action: PayloadAction<Error>) => {
      state.appointments = undefined;
      state.appointmentsError = action.payload;
    },
    updateAppointment: (state) => {
      state.updatingAppointment = true;
    },
    updateAppointmentError: (state, action: PayloadAction<Error>) => {
      state.updatingAppointment = false;
      state.updatingAppointmentError = action.payload;
    },
    updateAppointmentSuccess: (state, action: PayloadAction<Appointment>) => {
      state.updatingAppointment = false;
      state.updatedAppointment = action.payload;
    },
    setUserInfoAndAuthenticationHeader: (
      state,
      action: PayloadAction<{ userInfo: UserInfo; header: string }>
    ) => {
      const { userInfo, header } = action.payload;
      state.userInfo = userInfo;
      state.authenticationHeader = header;
    },
    resetStaffState: (state) => {
      return initialState;
    },
  },
});

export const {
  setAppointments,
  setAppointmentsError,
  setUserInfoAndAuthenticationHeader,
  resetStaffState,
  updateAppointment,
  updateAppointmentError,
  updateAppointmentSuccess,
} = staffSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuthenticationHeader = (state: RootState) =>
  state.staff.authenticationHeader;

export default staffSlice.reducer;

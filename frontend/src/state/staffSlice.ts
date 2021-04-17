import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appointment, UserInfo } from "./dataTypes";
import type { RootState } from "./store";

// Define a type for the slice state
export interface StaffState {
  authenticationHeader: string | undefined;
  userInfo: UserInfo | undefined;
}

// Define the initial state using that type
const initialState: StaffState = {
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

export const staffSlice = createSlice({
  name: "staff",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    postAppointment: (state) => {
      // state.value += 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserInfoAndAuthenticationHeader: (
      state,
      action: PayloadAction<{ userInfo: UserInfo; header: string }>
    ) => {
      const { userInfo, header } = action.payload;
      state.authenticationHeader = header;
      state.userInfo = userInfo;
    },
    unsetUserInfoAndAuthenticationHeader: (state, action: PayloadAction) => {
      state.authenticationHeader = undefined;
      state.userInfo = undefined;
    },
  },
});

export const {
  setUserInfoAndAuthenticationHeader,
  unsetUserInfoAndAuthenticationHeader,
} = staffSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuthenticationHeader = (state: RootState) =>
  state.staff.authenticationHeader;

export const selectAppointmentMode = (state: RootState) =>
  state.app.customerMode;

export default staffSlice.reducer;

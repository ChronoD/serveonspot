import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBasicAuthToken } from "../functions/utilFunctions";
import {
  AppointmentInfo,
  AppointmentStatus,
  LoginDetails,
  UserInfo,
} from "./dataTypes";
import type { AppDispatch, RootState } from "./store";

export interface StaffState {
  gettingUserInfo: boolean;
  userInfo: UserInfo | undefined;
  authHeader: string | undefined;
  userInfoError: Error | undefined;
  updatingAppointment: boolean;
  updatingAppointmentId: number | undefined;
  updatingAppointmentError: Error | undefined;
  updatedAppointment: AppointmentInfo | undefined;
  appointments: AppointmentInfo[] | undefined;
  appointmentsError: Error | undefined;
}

const initialState: StaffState = {
  gettingUserInfo: false,
  userInfo: undefined,
  authHeader: undefined,
  userInfoError: undefined,
  updatingAppointment: false,
  updatingAppointmentId: undefined,
  updatingAppointmentError: undefined,
  updatedAppointment: undefined,
  appointments: undefined,
  appointmentsError: undefined,
};

export const loginThunk = createAsyncThunk<
  UserInfo,
  LoginDetails,
  { rejectValue: Error }
>("staff/login", async (loginDetais, thunkApi) => {
  const authToken = createBasicAuthToken(loginDetais);
  const response = await fetch(`http://localhost:8080/user`, {
    method: "GET",
    headers: {
      authorization: authToken,
      "Access-Control-Allow-Origin": "*",
    },
  });
  const data = await response.json();
  if (
    response.status === 400 ||
    response.status === 401 ||
    response.status === 500
  ) {
    return thunkApi.rejectWithValue((await response.json()) as Error);
  }

  return data as UserInfo;
});

export const changeAppointmentStatusThunk = createAsyncThunk<
  AppointmentInfo,
  { appointmentId: number; status: AppointmentStatus },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("staff/updateAppointment", async (input, thunkApi) => {
  thunkApi.dispatch(setUpdatingAppointmentId(input.appointmentId));
  const response = await fetch(
    `http://localhost:8080/appointments/${input.appointmentId}`,
    {
      method: "PATCH",
      headers: {
        authorization: `${thunkApi.getState().staff.authHeader}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: input.status }),
    }
  );
  if (
    response.status === 400 ||
    response.status === 401 ||
    response.status === 500
  ) {
    return thunkApi.rejectWithValue((await response.json()) as Error);
  }
  const data = await response.json();
  return data as AppointmentInfo;
});

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaffAppointments: (state, action: PayloadAction<AppointmentInfo[]>) => {
      state.appointments = action.payload;
      state.appointmentsError = undefined;
    },
    setAppointmentsError: (state, action: PayloadAction<Error>) => {
      console.log(action);
      state.appointments = undefined;
      state.appointmentsError = action.payload;
    },
    setUpdatingAppointmentId: (state, action: PayloadAction<number>) => {
      state.updatingAppointmentId = action.payload;
    },
    resetLoginError: (state) => {
      state.userInfoError = undefined;
    },
    resetUpdatingError: (state) => {
      state.updatingAppointmentError = undefined;
    },
    logout: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.gettingUserInfo = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.gettingUserInfo = false;
      state.userInfo = action.payload;
      state.userInfoError = undefined;
      state.authHeader = createBasicAuthToken({
        username: action.meta.arg.username,
        password: action.meta.arg.password,
      });
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.gettingUserInfo = false;
      state.userInfo = undefined;
      state.userInfoError = action.error
        ? new Error(action.error.message)
        : undefined;
    });
    builder.addCase(changeAppointmentStatusThunk.pending, (state) => {
      state.updatingAppointment = true;
    });
    builder.addCase(changeAppointmentStatusThunk.fulfilled, (state, action) => {
      state.updatingAppointment = false;
      state.updatingAppointmentId = undefined;
      state.appointments = state.appointments?.map((a) =>
        a.appointmentId === action.payload.appointmentId ? action.payload : a
      );
      state.updatingAppointmentError = undefined;
    });
    builder.addCase(changeAppointmentStatusThunk.rejected, (state, action) => {
      state.updatingAppointmentId = undefined;
      state.updatingAppointment = false;
      state.updatingAppointmentError = action.error
        ? new Error(action.error.message)
        : undefined;
    });
  },
});

export const {
  resetLoginError,
  setStaffAppointments,
  setAppointmentsError,
  setUpdatingAppointmentId,
  resetUpdatingError,
  logout,
} = staffSlice.actions;

export const selectAuthenticationHeader = (state: RootState) =>
  state.staff.authHeader;

export default staffSlice.reducer;

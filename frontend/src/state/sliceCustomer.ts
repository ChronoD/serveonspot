import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppointmentInfo, SpecialistInfo } from "./dataTypes";
import type { AppDispatch } from "./store";

export interface CustomerState {
  gettingSpecialists: boolean;
  gettingSpecialistsError: Error | undefined;
  specialists: SpecialistInfo[] | undefined;
  registeringAppointment: boolean;
  registeringSpecialistId: number | undefined;
  registeringError: Error | undefined;
  appointmentInfo: AppointmentInfo | undefined;
  unregisteringAppointment: boolean;
  unregisteringError: Error | undefined;
}

const initialState: CustomerState = {
  gettingSpecialists: false,
  gettingSpecialistsError: undefined,
  specialists: undefined,
  registeringAppointment: false,
  registeringSpecialistId: undefined,
  registeringError: undefined,
  appointmentInfo: undefined,
  unregisteringAppointment: false,
  unregisteringError: undefined,
};

export const registerWithSpecialistApi = createAsyncThunk<
  AppointmentInfo,
  number,
  {
    dispatch: AppDispatch;
    state: CustomerState;
  }
>("customer/register", async (specialistId: number, thunkApi: any) => {
  thunkApi.dispatch(setRegisteringSpecialistId(specialistId));
  const response = await fetch(
    `https://serve-on-spot.herokuapp.com/api/appointments`,
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ specialistId: specialistId }),
    }
  );
  const data = await response.json();
  return data as AppointmentInfo;
});

export const unregisterWithSpecialistApi = createAsyncThunk<
  AppointmentInfo,
  number
>("customer/unregisterAppointment", async (appointmentId: number) => {
  const response = await fetch(
    `https://serve-on-spot.herokuapp.com/api/appointments/${appointmentId}`,
    {
      method: "PATCH",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "UNREGISTERED" }),
    }
  );
  const data = await response.json();
  return data as AppointmentInfo;
});

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    gettingSpecialists: (state) => {
      state.gettingSpecialists = true;
    },
    specialistsSuccess: (state, action: PayloadAction<SpecialistInfo[]>) => {
      state.gettingSpecialists = false;
      state.specialists = action.payload;
    },
    specialistsError: (state, action: PayloadAction<Error>) => {
      state.gettingSpecialists = false;
      state.registeringError = action.payload;
    },
    setRegisteringSpecialistId: (state, action: PayloadAction<number>) => {
      state.registeringSpecialistId = action.payload;
    },
    resetRegisteringError: (state) => {
      state.registeringError = undefined;
    },
    gettingAppointmentSuccess: (
      state,
      action: PayloadAction<AppointmentInfo>
    ) => {
      state.appointmentInfo = action.payload;
    },
    gettingAppointmentError: (state, action: PayloadAction<Error>) => {
      state.registeringError = action.payload;
    },
    resetUnregisteringError: (state) => {
      state.unregisteringError = undefined;
    },
    resetCustomerState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerWithSpecialistApi.pending, (state) => {
      state.registeringAppointment = true;
    });
    builder.addCase(registerWithSpecialistApi.fulfilled, (state, action) => {
      state.registeringAppointment = false;
      state.registeringSpecialistId = undefined;
      state.appointmentInfo = action.payload;
      state.registeringError = undefined;
    });
    builder.addCase(registerWithSpecialistApi.rejected, (state, action) => {
      state.registeringAppointment = false;
      state.registeringSpecialistId = undefined;
      state.registeringError = action.error
        ? new Error(action.error.message)
        : undefined;
    });
    builder.addCase(unregisterWithSpecialistApi.pending, (state) => {
      state.unregisteringAppointment = true;
    });
    builder.addCase(unregisterWithSpecialistApi.fulfilled, (state, action) => {
      state.appointmentInfo = action.payload;
      state.unregisteringAppointment = false;
      state.unregisteringError = undefined;
    });
    builder.addCase(unregisterWithSpecialistApi.rejected, (state, action) => {
      state.unregisteringAppointment = false;
      state.unregisteringError = action.error
        ? new Error(action.error.message)
        : undefined;
    });
  },
});

export const {
  gettingSpecialists,
  specialistsSuccess,
  specialistsError,
  setRegisteringSpecialistId,
  resetRegisteringError,
  gettingAppointmentSuccess,
  gettingAppointmentError,
  resetUnregisteringError,
  resetCustomerState,
} = customerSlice.actions;

export default customerSlice.reducer;

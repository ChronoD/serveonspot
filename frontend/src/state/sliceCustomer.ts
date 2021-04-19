import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppointmentInfo, Specialist } from "./dataTypes";
import { setUpdatingAppointmentId } from "./sliceStaff";
import type { AppDispatch, RootState } from "./store";

export interface CustomerState {
  gettingSpecialists: boolean;
  gettingSpecialistsError: Error | undefined;
  specialists: Specialist[] | undefined;
  postingAppointment: boolean;
  registeringSpecialistId: number | undefined;
  appointmentError: Error | undefined;
  appointmentInfo: AppointmentInfo | undefined;
  unregisteringAppointment: boolean;
  unregisteringAppointmentError: Error | undefined;
}

const initialState: CustomerState = {
  gettingSpecialists: false,
  gettingSpecialistsError: undefined,
  specialists: undefined,
  postingAppointment: false,
  registeringSpecialistId: undefined,
  appointmentError: undefined,
  appointmentInfo: undefined,
  unregisteringAppointment: false,
  unregisteringAppointmentError: undefined,
};

export const registerWithSpecialistThunk = createAsyncThunk<
  AppointmentInfo,
  number,
  {
    dispatch: AppDispatch;
    state: CustomerState;
  }
>("customer/register", async (specialistId: number, thunkApi: any) => {
  thunkApi.dispatch(setRegisteringSpecialistId(specialistId));
  const response = await fetch(`http://localhost:8080/appointments`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ specialistId: specialistId }),
  });
  const data = await response.json();
  return data as AppointmentInfo;
});

export const unregisterWithSpecialistThunk = createAsyncThunk<
  AppointmentInfo,
  number
>("customer/unregisterAppointment", async (appointmentId: number) => {
  const response = await fetch(
    `http://localhost:8080/appointments/${appointmentId}`,
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
    specialistsSuccess: (state, action: PayloadAction<Specialist[]>) => {
      state.gettingSpecialists = false;
      state.specialists = action.payload;
    },
    specialistsError: (state, action: PayloadAction<Error>) => {
      state.gettingSpecialists = false;
      state.appointmentError = action.payload;
    },
    setRegisteringSpecialistId: (state, action: PayloadAction<number>) => {
      state.registeringSpecialistId = action.payload;
    },
    resetRegisteringError: (state) => {
      state.appointmentError = undefined;
    },
    watchAppointmentSuccess: (
      state,
      action: PayloadAction<AppointmentInfo>
    ) => {
      state.appointmentInfo = action.payload;
    },
    watchAppointmentError: (state, action: PayloadAction<Error>) => {
      state.appointmentError = action.payload;
    },
    resetUnregisteringError: (state) => {
      state.unregisteringAppointmentError = undefined;
    },
    resetCustomerState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerWithSpecialistThunk.pending, (state) => {
      state.postingAppointment = true;
    });
    builder.addCase(registerWithSpecialistThunk.fulfilled, (state, action) => {
      state.postingAppointment = false;
      state.registeringSpecialistId = undefined;
      state.appointmentInfo = action.payload;
      state.appointmentError = undefined;
    });
    builder.addCase(registerWithSpecialistThunk.rejected, (state, action) => {
      state.postingAppointment = false;
      state.registeringSpecialistId = undefined;
      state.appointmentError = action.error
        ? new Error(action.error.message)
        : undefined;
    });
    builder.addCase(unregisterWithSpecialistThunk.pending, (state) => {
      state.unregisteringAppointment = true;
    });
    builder.addCase(
      unregisterWithSpecialistThunk.fulfilled,
      (state, action) => {
        state.appointmentInfo = action.payload;
        state.unregisteringAppointment = false;
        state.unregisteringAppointmentError = undefined;
      }
    );
    builder.addCase(unregisterWithSpecialistThunk.rejected, (state, action) => {
      state.unregisteringAppointment = false;
      state.unregisteringAppointmentError = action.error
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
  watchAppointmentSuccess,
  watchAppointmentError,
  resetUnregisteringError,
  resetCustomerState,
} = customerSlice.actions;

export default customerSlice.reducer;

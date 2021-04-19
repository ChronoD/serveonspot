import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Appointment, AppointmentInfo, Specialist } from "./dataTypes";
import type { RootState } from "./store";

type ErrorText = {
  message: string;
};

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

export const registerWithSpecialistThunk = createAsyncThunk<
  AppointmentInfo,
  number,
  {
    state: CustomerState;
  }
>("users/registerWithSpecialist", regA);

export async function regA(specialistId: number): Promise<AppointmentInfo> {
  const response = await fetch(`http://localhost:8080/appointments`, {
    method: "POST", // or 'PUT'
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ specialistId: specialistId }),
  });

  // Get the JSON from the response:
  const data = await response.json();

  // Return result:
  return data as AppointmentInfo;
}

//   axios
//     .post(
//       `http://localhost:8080/appointments`,
//       { specialistId: specialistId },
//       {
//         headers: { "Access-Control-Allow-Origin": "*" },
//       }
//     )
//     .then((res) => {
//       // console.log(res);
//       const data = res.data;
//       // onSuccess(data);
//     })
//     .catch((error) => {
//       // console.log(error);
//       onError(error);
//     });
// }

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
    resetCustomerState: (state) => {
      return initialState;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
  extraReducers: (builder) => {
    builder.addCase(registerWithSpecialistThunk.pending, (state) => {
      state.postingAppointment = true;
    });
    builder.addCase(registerWithSpecialistThunk.fulfilled, (state, action) => {
      state.postingAppointment = false;
      state.appointmentInfo = action.payload;
    });
    builder.addCase(registerWithSpecialistThunk.rejected, (state, action) => {
      state.postingAppointment = false;
      state.appointmentError = action.error
        ? new Error(action.error.message)
        : undefined;
    });
    // {
    //   [registerWithSpecialistThunk.pending.toString()]: (state) => {
    //     state.postingAppointment = true;
    //   },
    //   [registerWithSpecialistThunk.fulfilled.toString()]: (
    //     state,
    //     action: PayloadAction<AppointmentInfo>
    //   ) => {
    //     console.log("here");
    //     state.postingAppointment = false;
    //     state.appointmentInfo = action.payload;
    //   },
    //   [registerWithSpecialistThunk.rejected.toString()]: (
    //     state,
    //     action: PayloadAction<Error>
    //   ) => {
    //     console.log("err");

    //     state.postingAppointment = false;
    //     state.appointmentError = action.payload;
    //   },
    // },
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
  resetCustomerState,
} = customerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSpecialists = (state: RootState) =>
  state.customer.specialists;
export const selectAppointment = (state: RootState) =>
  state.customer.appointmentInfo;

export const selectPostingAppointmentStatus = (state: RootState) =>
  state.customer.postingAppointment;

export default customerSlice.reducer;

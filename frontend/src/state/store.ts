import { configureStore } from "@reduxjs/toolkit";
import mainPanelReducer from "./sliceMainPanel";
import customerReducer from "./sliceCustomer";
import staffReducer from "./sliceStaff";

export const store = configureStore({
  reducer: {
    mainPanel: mainPanelReducer,
    customer: customerReducer,
    staff: staffReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

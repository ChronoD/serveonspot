import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import customerReducer from "./customerSlice";
import staffReducer from "./staffSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    customer: customerReducer,
    staff: staffReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

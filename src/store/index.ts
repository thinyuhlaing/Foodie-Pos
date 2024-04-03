import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slices/menuSlice";
import menuCategoryReducer from "./slices/menuCategorySlice";
import snackbarReducer from "./slices/appSnackbarSlice";
import companyReducer from "./slices/companySlice";
import appReducer from "./slices/appSlice";
import menuCategoryMenuReducer from "./slices/menuCategoryMenuSlice";
import locationSliceReducer from "./slices/locationSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    menuCategory: menuCategoryReducer,
    snackbar: snackbarReducer,
    company: companyReducer,
    app: appReducer,
    menuCategoryMenu: menuCategoryMenuReducer,
    location: locationSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

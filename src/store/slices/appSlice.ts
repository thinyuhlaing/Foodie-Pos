import { config } from "@/config";
import { AppSlice } from "@/types/app";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMenuCategories } from "./menuCategorySlice";
import { setCompany } from "./companySlice";
import { setMenus } from "./menuSlice";
import { setMenuCategoryMenus } from "./menuCategoryMenuSlice";
import { setLocation } from "./locationSlice";
import { Location } from "@prisma/client";
const initialState: AppSlice = {
  init: false,
  selectedLocation: null,
  isLoading: false,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (_, thunkApi) => {
    const response = await fetch(`${config.backofficeApiBaseUrl}/app`);
    const dataFromServer = await response.json();
    const { menus, menuCategoryMenus, menuCategories, company, locations } =
      dataFromServer;
    console.log(dataFromServer);
    thunkApi.dispatch(setMenus(menus));
    thunkApi.dispatch(setMenuCategories(menuCategories));
    thunkApi.dispatch(setCompany(company));
    thunkApi.dispatch(setLocation(locations));
    thunkApi.dispatch(setMenuCategoryMenus(menuCategoryMenus));
    thunkApi.dispatch(setInit(true));

    const selectedLocationId = localStorage.getItem("selectedLocationId");
    if (selectedLocationId) {
      const selectedLocation = locations.find(
        (item: any) => item.id === Number(selectedLocationId)
      ) as Location;
      thunkApi.dispatch(setSelectedLocation(selectedLocation));
    } else {
      thunkApi.dispatch(setSelectedLocation(locations[0]));
    }
    thunkApi.dispatch(setInit(true));
    thunkApi.dispatch(setIsLoading(false));
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setInit, setSelectedLocation, setIsLoading } = appSlice.actions;
export default appSlice.reducer;

import { config } from "@/config";
import { AppSlice, GetAppDataOptions, UploadAssetPayload } from "@/types/app";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMenuCategories } from "./menuCategorySlice";
import { setCompany } from "./companySlice";
import { setMenus } from "./menuSlice";
import { setMenuCategoryMenus } from "./menuCategoryMenuSlice";
import { setLocation } from "./locationSlice";
import { Location } from "@prisma/client";
import { setDisabledLocationMenuCategory } from "./disabledLocationMenuCategorySlice";
import { setDisabledLocationMenu } from "./disabledLocationMenuSlice";
import { setMenuAddonCategory } from "./menuAddonCategorySlice";
import { setAddonCategory } from "./addonCategorySlice";
import { setAddon } from "./addonSlice";
import { setTable } from "./tableSlice";
import { RootState } from "..";
const initialState: AppSlice = {
  init: false,
  selectedLocation: null,
  isLoading: false,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (options: GetAppDataOptions, thunkApi) => {
    const { tableId } = options;
    const apiUrl = tableId
      ? `${config.orderAppApiUrl}/app?tableId=${tableId}`
      : `${config.backofficeApiBaseUrl}/app`;

    const response = await fetch(apiUrl);
    const dataFromServer = await response.json();
    const {
      menus,
      menuCategoryMenus,
      menuCategories,
      company,
      locations,
      disabledLocationMenuCategories,
      disabledLocationMenus,
      menuAddonCategories,
      addonCategories,
      addons,
      tables,
    } = dataFromServer;
    console.log("AlldataFromServer:", dataFromServer);
    thunkApi.dispatch(setCompany(company));
    thunkApi.dispatch(setMenus(menus));
    thunkApi.dispatch(setMenuCategories(menuCategories));
    thunkApi.dispatch(setLocation(locations));
    thunkApi.dispatch(setMenuCategoryMenus(menuCategoryMenus));
    thunkApi.dispatch(setInit(true));
    thunkApi.dispatch(
      setDisabledLocationMenuCategory(disabledLocationMenuCategories)
    );
    thunkApi.dispatch(setDisabledLocationMenu(disabledLocationMenus));

    thunkApi.dispatch(setAddonCategory(addonCategories));
    thunkApi.dispatch(setMenuAddonCategory(menuAddonCategories));
    thunkApi.dispatch(setAddon(addons));
    thunkApi.dispatch(setTable(tables));

    const selectedLocationId = localStorage.getItem("selectedLocationId");
    if (selectedLocationId) {
      // old user
      const isValidselectedLocationId = locations.find(
        (item: any) => item.id === Number(selectedLocationId)
      );
      if (isValidselectedLocationId) {
        // old user --> selected location same as selectedLocationId
        const selectedLocation = locations.find(
          (item: any) => item.id === Number(selectedLocationId) // don't forget Number() cuz selectedLocationId is string, can't number === string be the same
        ) as Location;
        thunkApi.dispatch(setSelectedLocation(selectedLocation));
      } else {
        //old user --> selected location don't same as locatstoarge selectedLocationId
        localStorage.setItem("selectedLocationId", String(locations[0].id));
        thunkApi.dispatch(setSelectedLocation(locations[0]));
      }
    } else {
      // new User --> selected first location
      thunkApi.dispatch(setSelectedLocation(locations[0]));
    }

    thunkApi.dispatch(setInit(true));
    thunkApi.dispatch(setIsLoading(false));
  }
);

export const uploadAsset = createAsyncThunk(
  "app/uploadAsset",
  async (payload: UploadAssetPayload) => {
    const { file, onSuccess } = payload;
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${config.backofficeApiBaseUrl}/asset`, {
      method: "POST",
      body: formData,
    });
    const dataFromServer = await response.json();
    const { assetUrl } = dataFromServer;
    onSuccess && onSuccess(assetUrl);
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

export const appDataSelector = (state: RootState) => {
  return {
    selectedLocation: state.app.selectedLocation,
    menus: state.menu.menus,
    menuCategories: state.menuCategory.menuCategories,
    menuCategoryMenus: state.menuCategoryMenu.menuCategoryMenus,
    addonCategories: state.addonCategory.addonCategories,
    addons: state.addon.addons,
    menuAddonCategories: state.menuAddonCategory.menuAddonCategories,
    disabledLocationMenuCategories:
      state.disabledLocationMenuCategory.disabledLocationMenuCategories,
    company: state.company.company,
    items: state.cart.items,
    orders: state.order.items,
    tables: state.table.tables,
  };
};

export default appSlice.reducer;
// const selectedLocationId = localStorage.getItem("selectedLocationId");
// if (selectedLocationId) {
//   const selectedLocation = locations.find(
//     (item: any) => item.id === Number(selectedLocationId)
//   ) as Location;
//   thunkApi.dispatch(setSelectedLocation(selectedLocation));
// } else {
//   thunkApi.dispatch(setSelectedLocation(locations[0]));
// }

// const selectedLocationId = localStorage.getItem("selectedLocationId");
// console.log("selectedLocationId:", selectedLocationId);
// const isValidselectedLocationId = locations.find(
//   (item: any) => item.id === selectedLocationId
// );
// if (isValidselectedLocationId) {
//   const selectedLocation = locations.find(
//     (item: any) => item.id === Number(selectedLocationId)
//   ) as Location;

//   thunkApi.dispatch(setSelectedLocation(selectedLocation));
// } else {
//   localStorage.setItem("selectedLocationId", String(locations[0].id));
//   thunkApi.dispatch(setSelectedLocation(locations[0]));
// }

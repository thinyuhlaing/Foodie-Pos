import { config } from "@/config";
import {
  CreateAddonCategoryPayload,
  DeleteAddonCategoryPayload,
  UpdateAddonCategoryPayload,
} from "@/types/addonCategory";
import { AddonCategory, MenuCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMenuAddonCategory } from "./menuAddonCategorySlice";

interface AddonCategorySlice {
  addonCategories: AddonCategory[]; // name, isAvailable, companyId
  isLoading: boolean;
  error: Error | null;
}

const initialState: AddonCategorySlice = {
  addonCategories: [],
  isLoading: false,
  error: null,
};

export const createAddonCategroy = createAsyncThunk(
  "addonCategory/createAddonCategroy",
  async (payload: CreateAddonCategoryPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/addon-category`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { addonCategory, menuAddonCategories } = dataFromServer;
    console.log("DataFormServer AddonCategories", dataFromServer);
    onSuccess && onSuccess();
    thunkApi.dispatch(addAddonCategory(addonCategory));
    thunkApi.dispatch(addMenuAddonCategory(menuAddonCategories));
    // disabledLocationMenuCategoriesAdd &&
    //   thunkApi.dispatch(
    //     addDisabledLocationMenuCategory(disabledLocationMenuCategoriesAdd)
    //   );
  }
);

export const updateAddonCategory = createAsyncThunk(
  "addonCategory/createAddonCategroy",
  async (payload: UpdateAddonCategoryPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/addon-category`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updateAddonCategory } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(replaceAddonCategory(updateAddonCategory));
  }
);

export const deleteAddonCategory = createAsyncThunk(
  "addonCategory/createAddonCategroy",
  async (payload: DeleteAddonCategoryPayload, thunkApi) => {
    const { id, onSuccess } = payload;
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/addon-category?id=${id}`,
      {
        method: "DELETE",
      }
    );
    onSuccess && onSuccess();
    thunkApi.dispatch(removeAddonCategory(id));
  }
);

export const addonCategorySlice = createSlice({
  name: "addCategory",
  initialState,
  reducers: {
    setAddonCategory: (state, action: PayloadAction<AddonCategory[]>) => {
      state.addonCategories = action.payload;
    },
    addAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = [...state.addonCategories, action.payload];
    },
    replaceAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = state.addonCategories.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeAddonCategory: (state, action: PayloadAction<number>) => {
      state.addonCategories = state.addonCategories.filter((addonCategory) =>
        addonCategory.id === action.payload ? false : true
      );
    },
  },
});

export const {
  setAddonCategory,
  addAddonCategory,
  replaceAddonCategory,
  removeAddonCategory,
} = addonCategorySlice.actions;
export default addonCategorySlice.reducer;

import { config } from "@/config";
import {
  CreateAddonCategoryPayload,
  DeleteAddonCategoryPayload,
  UpdateAddonCategoryPayload,
} from "@/types/addonCategory";
import { AddonCategory, MenuAddonCategory, MenuCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface MenuAddonCategorySlice {
  menuAddonCategories: MenuAddonCategory[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: MenuAddonCategorySlice = {
  menuAddonCategories: [],
  isLoading: false,
  error: null,
};

export const menuAddonCategorySlice = createSlice({
  name: "menuAddCategory",
  initialState,
  reducers: {
    setMenuAddonCategory: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      state.menuAddonCategories = action.payload;
    },
    addMenuAddonCategory: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      state.menuAddonCategories = [
        ...state.menuAddonCategories,
        ...action.payload,
      ];
    },
    replaceMenuAddonCategory: (
      state,
      action: PayloadAction<MenuAddonCategory>
    ) => {
      // state.addonCategories = state.menuCategories.map((item) =>
      //   item.id === action.payload.id ? action.payload : item
      // );
    },
    removeMenuAddonCategory: (state, action: PayloadAction<number>) => {
      // state.addonCategories = state.menuCategories.filter((menuCategory) =>
      //   menuCategory.id === action.payload ? false : true
      // );
    },
  },
});

export const {
  setMenuAddonCategory,
  addMenuAddonCategory,
  replaceMenuAddonCategory,
  removeMenuAddonCategory,
} = menuAddonCategorySlice.actions;
export default menuAddonCategorySlice.reducer;

import { config } from "@/config";
import {
  CreateMenuCategoryPayload,
  UpdateMenuCategoryPayload,
} from "@/types/menuCategory";
import { MenuCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MenuCategorySlice {
  menuCategories: MenuCategory[]; // name, isAvailable, companyId
  isLoading: boolean;
  error: Error | null;
}

const initialState: MenuCategorySlice = {
  menuCategories: [],
  isLoading: false,
  error: null,
};

export const createMenuCategroy = createAsyncThunk(
  "menuCategory/createMenuCategory",
  async (payload: CreateMenuCategoryPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/menu-category`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { menuCategory } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(addMenuCategory(menuCategory));
  }
);

export const updateMenuCategory = createAsyncThunk(
  "menuCategory/updateMenuCategory",
  async (payload: UpdateMenuCategoryPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/menu-category`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedMenuCategory } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(replaceMenuCategory(updatedMenuCategory));
  }
);
// need  update

export const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategories: (state, action: PayloadAction<MenuCategory[]>) => {
      state.menuCategories = action.payload;
    }, // inital data
    addMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategories = [...state.menuCategories, action.payload];
    },
    replaceMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategories = state.menuCategories.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategories = state.menuCategories.filter((menuCategory) =>
        menuCategory.id === action.payload.id ? false : true
      );
    },
  },
});

export const {
  setMenuCategories,
  addMenuCategory,
  replaceMenuCategory,
  removeMenuCategory,
} = menuCategorySlice.actions;
export default menuCategorySlice.reducer;

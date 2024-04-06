import { config } from "@/config";
import {
  CreateMenuCategoryPayload,
  DeleteMenuCategoryPayload,
  UpdateMenuCategoryPayload,
} from "@/types/menuCategory";
import { MenuCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDisabledLocationMenuCategory,
  removeDisabledLocationMenuCategory,
  setDisabledLocationMenuCategory,
} from "./disabledLocationMenuCategorySlice";
import { fetchAppData, setInit } from "./appSlice";

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
    const { menuCategory, disabledLocationMenuCategoriesAdd } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(addMenuCategory(menuCategory));
    disabledLocationMenuCategoriesAdd &&
      thunkApi.dispatch(
        addDisabledLocationMenuCategory(disabledLocationMenuCategoriesAdd)
      );
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
    const { updatedMenuCategory, disabledLocationMenuCategories } =
      dataFromServer;
    console.log("hey:", disabledLocationMenuCategories);
    onSuccess && onSuccess();

    thunkApi.dispatch(
      setDisabledLocationMenuCategory(disabledLocationMenuCategories)
    );
    thunkApi.dispatch(replaceMenuCategory(updatedMenuCategory));

    // thunkApi.dispatch(
    //   addDisabledLocationMenuCategory(disabledLocationMenuCategoriesAddObj)
    // ); call fetch data instand of disabledLocationMenuCategoriesAdd data
    // thunkApi.dispatch(setInit(false));
  }
);

export const deleteMenuCategory = createAsyncThunk(
  "menuCategory/deleteMenuCategory",
  async (payload: DeleteMenuCategoryPayload, thunkApi) => {
    const { id, onSuccess } = payload;
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/menu-category?id=${id}`,
      {
        method: "DELETE",
      }
    );
    onSuccess && onSuccess();
    thunkApi.dispatch(removeMenuCategory(id));
  }
);

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
    removeMenuCategory: (state, action: PayloadAction<number>) => {
      state.menuCategories = state.menuCategories.filter((menuCategory) =>
        menuCategory.id === action.payload ? false : true
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

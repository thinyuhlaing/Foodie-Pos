import { config } from "@/config";
import { CreateMenuCategoryPayload } from "@/types/menuCategory";
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
  }
);
export const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    addMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategories = [...state.menuCategories, action.payload];
    },
  },
});

export default menuCategorySlice.reducer;

import { config } from "@/config";
import { CreateMenuPayload } from "@/types/menu";
import { Menu } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface MenuSlice {
  menus: Menu[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MenuSlice = {
  menus: [],
  isLoading: false,
  error: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (payload: CreateMenuPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backofficeApiBaseUrl}/menu`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });
    const dataFromServer = await response.json();
    const { menu } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(addMenus(menu));
    return menu;
  }
);

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, action: PayloadAction<Menu[]>) => {
      state.menus = action.payload;
    },
    addMenus: (state, action: PayloadAction<Menu>) => {
      state.menus = [...state.menus, action.payload];
    },
    removeMeus: (state, action: PayloadAction<Menu>) => {
      state.menus = state.menus.filter(
        (menu) => (menu.id === action.payload.id ? false : true) // false --> delete & true --> undelete
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.menus = [...state.menus, action.payload];
        state.isLoading = false;
      })
      .addCase(createMenu.rejected, (state) => {
        state.isLoading = false;
        const err = new Error("createMenu error occurred");
        state.error = err.message;
      });
  },
});

export const { setMenus, addMenus, removeMeus } = menuSlice.actions;
export default menuSlice.reducer;

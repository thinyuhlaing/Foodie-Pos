import { BaseMenu } from "@/types/menu";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MenuSlice {
  menus: BaseMenu[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MenuSlice = {
  menus: [],
  isLoading: false,
  error: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
});
export default menuSlice.reducer;

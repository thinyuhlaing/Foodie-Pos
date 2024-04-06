import { DisabledLocationMenuSlice } from "@/types/disabledLocationMenu";
import { DisabledLocationMenu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: DisabledLocationMenuSlice = {
  disabledLocationMenus: [],
  isLoading: false,
  error: null,
};

export const disabledLocationMenuSlice = createSlice({
  name: "disabledLocationMenu",
  initialState,
  reducers: {
    setDisabledLocationMenu: (
      state,
      action: PayloadAction<DisabledLocationMenu[]>
    ) => {
      state.disabledLocationMenus = action.payload;
    },
    addDisabledLocationMenu: (
      state,
      action: PayloadAction<DisabledLocationMenu>
    ) => {
      state.disabledLocationMenus = [
        ...state.disabledLocationMenus,
        action.payload,
      ];
    },
    removeDisabledLocationMenu: (state, action: PayloadAction<number>) => {
      state.disabledLocationMenus = state.disabledLocationMenus.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
  },
});

export const {
  setDisabledLocationMenu,
  addDisabledLocationMenu,
  removeDisabledLocationMenu,
} = disabledLocationMenuSlice.actions;

export default disabledLocationMenuSlice.reducer;

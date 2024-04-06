import { DisabledLocationMenuCategorySlice } from "@/types/disabledLocationMenuCategory";
import { DisabledLocationMenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: DisabledLocationMenuCategorySlice = {
  disabledLocationMenuCategories: [],
  isLoading: false,
  error: null,
};

export const disabledLocationMenuCategorySlice = createSlice({
  name: "disabledLocationMenuCategory",
  initialState,
  reducers: {
    setDisabledLocationMenuCategory: (
      state,
      action: PayloadAction<DisabledLocationMenuCategory[]>
    ) => {
      state.disabledLocationMenuCategories = action.payload;
    },
    addDisabledLocationMenuCategory: (
      state,
      action: PayloadAction<DisabledLocationMenuCategory>
    ) => {
      state.disabledLocationMenuCategories = [
        ...state.disabledLocationMenuCategories,
        action.payload,
      ];
    },
    removeDisabledLocationMenuCategory: (
      state,
      action: PayloadAction<number>
    ) => {
      state.disabledLocationMenuCategories =
        state.disabledLocationMenuCategories.filter((item) =>
          item.id === action.payload ? false : true
        );
    },
  },
});

export const {
  setDisabledLocationMenuCategory,
  addDisabledLocationMenuCategory,
  removeDisabledLocationMenuCategory,
} = disabledLocationMenuCategorySlice.actions;

export default disabledLocationMenuCategorySlice.reducer;

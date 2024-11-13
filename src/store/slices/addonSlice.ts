import { config } from "@/config";
import {
  CreateAddonCategoryPayload,
  DeleteAddonCategoryPayload,
  UpdateAddonCategoryPayload,
} from "@/types/addonCategory";
import { Addon, AddonCategory, MenuCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMenuAddonCategory } from "./menuAddonCategorySlice";
import {
  AddonSlice,
  CreateAddonPayload,
  DeleteAddonPayload,
  UpdateAddonPayload,
} from "@/types/addon";

const initialState: AddonSlice = {
  addons: [],
  isLoading: false,
  error: null,
};

export const createAddon = createAsyncThunk(
  "addon/createAddon",
  async (payload: CreateAddonPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backofficeApiBaseUrl}/addon`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { addon } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(addAddon(addon));
  }
);

export const updateAddon = createAsyncThunk(
  "addon/updateAddon",
  async (payload: UpdateAddonPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backofficeApiBaseUrl}/addon`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updateAddon } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(replaceAddon(updateAddon));
  }
);

export const deleteAddon = createAsyncThunk(
  "addon/deleteAddon",
  async (payload: DeleteAddonPayload, thunkApi) => {
    const { id, onSuccess } = payload;
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/addon?id=${id}`,
      {
        method: "DELETE",
      }
    );
    onSuccess && onSuccess();
    thunkApi.dispatch(removeAddon(id));
  }
);

export const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddon: (state, action: PayloadAction<Addon[]>) => {
      state.addons = action.payload;
    },
    addAddon: (state, action: PayloadAction<Addon>) => {
      state.addons = [...state.addons, action.payload];
    },
    replaceAddon: (state, action: PayloadAction<Addon>) => {
      state.addons = state.addons.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeAddon: (state, action: PayloadAction<number>) => {
      state.addons = state.addons.filter((addon) =>
        addon.id === action.payload ? false : true
      );
    },
  },
});

export const { setAddon, addAddon, replaceAddon, removeAddon } =
  addonSlice.actions;
export default addonSlice.reducer;

import { config } from "@/config";
import {
  CreateLocationPayload,
  LocationSlice,
  UpdateLocationPayload,
} from "@/types/location";
import { Location } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: LocationSlice = {
  locations: [],
  isLoading: false,
  error: null,
};

export const createLocation = createAsyncThunk(
  "location/createLocation",
  async (payload: CreateLocationPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backofficeApiBaseUrl}/location`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { location } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(addLocation(location));
  }
);

export const updateLocation = createAsyncThunk(
  "location/updateLocation",
  async (payload: UpdateLocationPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backofficeApiBaseUrl}/location`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { location } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(replaceLocation(location));
  }
);

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations = [...state.locations, action.payload];
    },
    removeLocation: (state, action: PayloadAction<number>) => {
      state.locations = state.locations.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    replaceLocation: (state, action: PayloadAction<Location>) => {
      state.locations = state.locations.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setLocation, addLocation, removeLocation, replaceLocation } =
  locationSlice.actions;
export default locationSlice.reducer;

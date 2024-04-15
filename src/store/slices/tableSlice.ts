import { config } from "@/config";
import { Table } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateTablePayload,
  DeleteTablePayload,
  TableSlice,
  UpdateTablePayload,
} from "@/types/table";

const initialState: TableSlice = {
  tables: [],
  isLoading: false,
  error: null,
};

export const createTable = createAsyncThunk(
  "table/createTable",
  async (payload: CreateTablePayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backofficeApiBaseUrl}/table`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { table } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(addTable(table));
  }
);

export const updateTable = createAsyncThunk(
  "table/updateTable",
  async (payload: UpdateTablePayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backofficeApiBaseUrl}/table`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updateTable } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(replaceTable(updateTable));
  }
);

export const deleteTable = createAsyncThunk(
  "table/deleteTable",
  async (payload: DeleteTablePayload, thunkApi) => {
    const { id, onSuccess } = payload;
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/table?id=${id}`,
      {
        method: "DELETE",
      }
    );
    onSuccess && onSuccess();
    thunkApi.dispatch(removeTable(id));
  }
);

export const tableSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setTable: (state, action: PayloadAction<Table[]>) => {
      state.tables = action.payload;
    },
    addTable: (state, action: PayloadAction<Table>) => {
      state.tables = [...state.tables, action.payload];
    },
    replaceTable: (state, action: PayloadAction<Table>) => {
      state.tables = state.tables.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeTable: (state, action: PayloadAction<number>) => {
      state.tables = state.tables.filter((addon) =>
        addon.id === action.payload ? false : true
      );
    },
  },
});

export const { setTable, addTable, replaceTable, removeTable } =
  tableSlice.actions;
export default tableSlice.reducer;

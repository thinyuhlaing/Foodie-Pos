import { config } from "@/config";
import { CompanySlice, UpdateCompanyPayload } from "@/types/company";
import { Company } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CompanySlice = {
  company: null,
  isLoading: false,
  error: null,
};
export const updateCompany = createAsyncThunk(
  "menuCategory/updateMenu",
  async (payload: UpdateCompanyPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backofficeApiBaseUrl}/company`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedCompany, disabledLocationMenus } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(setCompany(updatedCompany));
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;

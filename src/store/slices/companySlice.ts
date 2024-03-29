import { CompanySlice } from "@/types/company";
import { Company } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CompanySlice = {
  company: 1,
  isLoading: false,
  error: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
});

export default companySlice.reducer;

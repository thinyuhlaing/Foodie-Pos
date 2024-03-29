import { Company } from "@prisma/client";

export interface CompanySlice {
  company: number;
  isLoading: boolean;
  error: Error | null;
}

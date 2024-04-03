import { Location } from "@prisma/client";
export interface AppSlice {
  init: boolean;
  selectedLocation: Location | null;
  isLoading: boolean;
  error: Error | null;
}

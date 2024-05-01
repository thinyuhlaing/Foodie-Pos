import { Location } from "@prisma/client";
import { BaseOptions } from "./user";
export interface AppSlice {
  init: boolean;
  selectedLocation: Location | null;
  isLoading: boolean;
  error: Error | null;
}

export interface UploadAssetPayload extends BaseOptions {
  file: File;
}

export interface GetAppDataOptions extends BaseOptions {
  tableId?: number;
}

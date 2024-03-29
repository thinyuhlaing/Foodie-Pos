import { BaseOptions } from "./user";
// onSuccess?: (data?: any) => void;
//   onError?: (error?: any) => void;

export interface CreateMenuCategoryPayload extends BaseOptions {
  name: string;
  isAvailable: boolean;
  companyId?: number;
}

export interface UpdateMenuCategoryPayload extends BaseOptions {
  id: number;
  name: string;
  isAvailable: boolean;
}

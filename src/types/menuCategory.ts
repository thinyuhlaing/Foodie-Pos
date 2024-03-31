import { BaseOptions } from "./user";

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

export interface UpdateMenuPayload extends BaseOptions {
  id: number;
  name: string;
  price: number;
}

import { BaseOptions } from "./user";

interface BaseMenu {
  name: string;
  price: number;
}

export interface CreateMenuPayload extends BaseOptions {
  name: string;
  price: number;
  menuCategoryIds: number[];
}
export interface DeleteMenuPayload extends BaseOptions {
  id: number;
}

export interface NewMenuParams extends BaseMenu, BaseOptions {}
export interface UpdateMenuPayload extends BaseOptions {
  id: number;
  name: string;
  price: number;
}

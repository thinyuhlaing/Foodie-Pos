import { BaseOptions } from "./user";

export interface BaseMenu {
  name: string;
  price: number;
}

export interface CreateMenuPayload extends BaseOptions {
  name: string;
  price: number;
}

export interface NewMenuParams extends BaseMenu, BaseOptions {}

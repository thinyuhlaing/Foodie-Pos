import { config } from "@/config";
import { CreateOrderOptions, RefreshOrderOptions } from "@/types/order";
import { Order } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { emptyCart } from "./cartSlice";
interface OrderSlice {
  items: Order[];
  isLoading: boolean;
  error: Error | null;
}
const initialState: OrderSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (payload: CreateOrderOptions, thunkApi) => {
    const { tableId, cartItems, onSuccess } = payload;
    const response = await fetch(`${config.orderAppApiUrl}/order`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tableId, cartItems }),
    });
    const dataFromServer = await response.json();
    const { orders } = dataFromServer;
    thunkApi.dispatch(emptyCart());
    thunkApi.dispatch(setOrders(orders));
    onSuccess && onSuccess(orders);
  }
);

export const refreshOrder = createAsyncThunk(
  "order/refreshOrder",
  async (options: RefreshOrderOptions, thunkApi) => {
    const { orderSeq, onSuccess, onError } = options;
    try {
      thunkApi.dispatch(setIsLoading(true));
      const response = await fetch(
        `${config.orderAppApiUrl}/order?orderSeq=${orderSeq}`
      );
      const { orders } = await response.json();
      thunkApi.dispatch(setOrders(orders));
      thunkApi.dispatch(setIsLoading(false));
      onSuccess && onSuccess(orders);
    } catch (err) {
      onError && onError();
    }
  }
);

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setIsLoading, setOrders } = OrderSlice.actions;
export default OrderSlice.reducer;

import { config } from "@/config";
import { CreateOrderOptions } from "@/types/order";
import { Order } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  async (payload: CreateOrderOptions) => {
    const { tableId, cartItems } = payload;
    const response = await fetch(`${config.orderAppApiUrl}/order`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tableId, cartItems }),
    });
    const dataFromServer = await response.json();
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

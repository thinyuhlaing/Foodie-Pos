import { buttonVariants } from "@/components/TopBar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appDataSelector } from "@/store/slices/appSlice";
import { showSnackbar } from "@/store/slices/appSnackbarSlice";
import { createOrder } from "@/store/slices/orderSlice";
import { getCartTotalPrice } from "@/utils/general";
import { Box, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Order } from "@prisma/client";
export default function Cart() {
  const cartItems = useAppSelector((state) => state.cart.items);
  console.log("cartItems", cartItems);
  const router = useRouter();
  const dispatch = useAppDispatch();
  console.log("route", router.query.tableId);
  const tableId = Number(router.query.tableId);

  const confirmOrder = () => {
    const isValid = tableId;
    if (!isValid) return;
    console.log("trueee");
    dispatch(
      createOrder({
        tableId,
        cartItems,
        onSuccess: (orders: Order[]) => {
          dispatch(
            showSnackbar({ type: "success", message: "order successfully" })
          );
          router.push({
            pathname: `active-order/${orders[0].orderSeq}`,
            query: { tableId: router.query.tableId },
          });
        },
      })
    );
  };

  return (
    <Box className="w-1/2  flex flex-col mx-auto  my-20 ">
      <Box className="w-full flex flex-col  mb-5">
        {cartItems.map((item: any, index: number) => (
          <Box
            className="p-3 w-full  flex flex-col  items-center  justify-between"
            key={index}
          >
            <Box className="flex  w-full justify-between">
              <Box className=" px-3 py-1 rounded-full bg-light-createB  text-light-bg h-fit text-center">
                {item.quantity}
              </Box>

              <Box className="flex flex-col w-[90%]">
                <Box className="w-full flex justify-between  text-light-createB  font-semibold text-lg">
                  <Box> {item.menu.name}</Box>
                  <Box> {item.menu.price}</Box>
                </Box>
                {item.addons.map((addon: any, index: number) => (
                  <Box
                    className="w-full pl-3 flex justify-between  font-serif"
                    key={index}
                  >
                    <Box> {addon.name}</Box>
                    <Box> {addon.price}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box className="flex  w-full justify-end mt-3">
              <DeleteIcon
                className="text-black"
                color="primary"
                sx={{ mr: 2, cursor: "pointer" }}
                // onClick={() => handleRemoveFromCart(cartItem)}
              />
              <EditIcon className="text-black" />
            </Box>
          </Box>
        ))}
      </Box>
      <Divider />
      <Box className="  self-end mt-3 mb-8 text-2xl">
        Total : {getCartTotalPrice(cartItems)}
      </Box>
      <motion.button
        className="create-b  self-center "
        variants={buttonVariants}
        initial="start"
        whileHover="hover"
        onClick={confirmOrder}
      >
        CONFIRM ORDER
      </motion.button>
    </Box>
  );
}

import { buttonVariants } from "@/components/TopBar";
import { useAppSelector } from "@/store/hooks";
import { appDataSelector } from "@/store/slices/appSlice";
import { Box, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { Router, useRouter } from "next/router";
import { shallowEqual } from "react-redux";

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cart.items);
  console.log("cartItems", cartItems);
  const router = useRouter();

  const confirmOrder = () => {
    // router.push({
    //   pathname: `active-order/`,
    //   query: { tableId: router.query.tableId },
    // })
  };
  return (
    <Box className="w-1/2  flex flex-col mx-auto  my-20 ">
      <Box className="w-full flex flex-col  mb-5">
        {cartItems.map((item: any) => (
          <Box className="p-3 w-full  flex flex-col  items-center  justify-between">
            <Box className="flex  w-full justify-between">
              <Box className=" px-3 py-1 rounded-full bg-light-createB  text-light-bg h-fit text-center">
                {item.quantity}
              </Box>

              <Box className="flex flex-col w-[90%]">
                <Box className="w-full flex justify-between  text-light-createB  font-semibold text-lg">
                  <Box> {item.menu.name}</Box>
                  <Box> {item.menu.price}</Box>
                </Box>
                {item.addons.map((addon: any) => (
                  <Box className="w-full pl-3 flex justify-between  font-serif">
                    <Box> {addon.name}</Box>
                    <Box> {addon.price}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box className="flex  w-full justify-end mt-3">
              <Box> Trash</Box>
              <Box> Edit</Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Divider />
      <Box className="  self-end mt-3 mb-8 text-2xl">Total : 4500{}</Box>
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

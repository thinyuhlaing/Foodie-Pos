import orderSlice from "@/store/slices/orderSlice";
import { CartItem } from "@/types/cart";
import { getCartTotalPrice } from "@/utils/general";
import { prisma } from "@/utils/prisma";
import { ORDERSTATUS } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { tableId, cartItems } = req.body;
    const isValid = tableId && cartItems.length !== undefined;
    if (!isValid) return res.status(401).send("Bad Request...");

    // const order = await prisma.order.findFirst({
    //   where: {
    //     tableId,
    //     status: { in: [ORDERSTATUS.PENDING, ORDERSTATUS.COOKING] },
    //   },
    // });

    const orderSeq = nanoid();
    const totalPrice = getCartTotalPrice(cartItems);
    // why don't take totalPrice from client , cuz "never tust the client"

    // const numbers = [1, 2, 3];

    // for (const num of numbers) {
    //   console.log("num", num);
    // num 1
    // num 2
    // num 3
    // }
    for (const item of cartItems) {
      const cartItem = item as CartItem;
      const hasAddons = cartItem.addons.length > 0;
      if (hasAddons) {
        for (const addon of cartItem.addons) {
          await prisma.order.create({
            data: {
              menuId: cartItem.menu.id,
              addonId: addon.id,
              itemId: cartItem.id,
              quantity: cartItem.quantity,
              orderSeq,
              status: ORDERSTATUS.PENDING,
              totalPrice,
              tableId,
            },
          });
        }
      } else {
        await prisma.order.create({
          data: {
            menuId: cartItem.menu.id,
            itemId: cartItem.id,
            quantity: cartItem.quantity,
            orderSeq,
            status: ORDERSTATUS.PENDING,
            totalPrice,
            tableId,
          },
        });
      }
    }
    await prisma.order.updateMany({
      data: { totalPrice },
      where: { orderSeq },
    });
    const orders = await prisma.order.findMany({ where: { orderSeq } });
    return res.status(200).json({ orders });
  }
  return res.status(200).send("Bad Request...");
}

import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { tableId, cartItems } = req.body;
    const isValid = tableId && cartItems !== undefined;
    if (!isValid) return res.status(401).send("Bad Request...");
    const order = await prisma.$transaction(
      cartItems.map((item: any) => {
        prisma.order.create({ data: { tableId, ...item } });
      })
    );
    console.log("tableId, cartItems", tableId, cartItems[0].id);
  }
  return res.status(200).send("Bad Request...");
}

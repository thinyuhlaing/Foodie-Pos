// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// Serverless function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("OK GET menu category");
  } else if (method === "POST") {
    const { name, isAvailable } = req.body;
    const isValid = name && isAvailable !== undefined;
    if (!isValid) return res.status(400).send("Bad Request ");
    const menuCategory = await prisma.menuCategory.create({
      data: { name, isAvailable, companyId: 1 },
    });
    //companyId
    return res.status(200).json({ menuCategory });
  } else if (method === "PUT") {
    const { id, ...payload } = req.body;
    const menuCategory = await prisma.menuCategory.findFirst({ where: { id } });
    if (!menuCategory) return res.status(400).send("Bad request.");
    const updatedMenuCategory = await prisma.menuCategory.update({
      data: payload,
      where: { id },
    });
    return res.status(200).json({ updatedMenuCategory });
  } else if (method === "DELETE") {
    const menuCategoryId = Number(req.query.id);

    const exist = await prisma.menuCategory.findFirst({
      where: { id: menuCategoryId },
    });
    if (!exist) return res.status(401).send("Bad request...");
    await prisma.menuCategory.update({
      data: { isArchived: true },
      where: { id: menuCategoryId },
    });
    return res.status(200).send("OK DELETE menu category");
  }
  return res.status(405).send("Invalid method");
}

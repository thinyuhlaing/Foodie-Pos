import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("OK GET menu");
  } else if (method === "POST") {
    const { name, price, menuCategoryIds } = req.body;
    const isValid = name && price !== undefined && menuCategoryIds.length > 0;
    if (!isValid) return res.status(401).send("Bad request");
    const menu = await prisma.menu.create({
      data: { name, price },
    });
    const menuCategoryMenus = await prisma.$transaction(
      menuCategoryIds.map((itemId: number) =>
        prisma.menuCategoryMenu.create({
          data: { menuId: menu.id, menuCategoryId: itemId },
        })
      )
    );
    return res.status(200).json({ menu, menuCategoryMenus });
  } else if (method === "PUT") {
    const { id, ...payload } = req.body;
    const menu = await prisma.menu.findFirst({ where: { id } });
    if (!menu) return res.status(400).send("Bad request.");
    const updatedMenu = await prisma.menu.update({
      data: payload,
      where: { id },
    });
    return res.status(200).json({ updatedMenu });
  } else if (method === "DELETE") {
    const menuId = Number(req.query.id);

    const exist = await prisma.menu.findFirst({
      where: { id: menuId },
    });
    if (!exist) return res.status(401).send("Bad request...");
    await prisma.menu.update({
      data: { isArchived: true },
      where: { id: menuId },
    });
    return res.status(200).send("OK DELETE menu category");
  }
}

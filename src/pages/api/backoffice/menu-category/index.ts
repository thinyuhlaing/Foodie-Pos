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
    const { name, locationId, companyId, isAvailable } = req.body;
    const isValid = name && companyId && isAvailable !== undefined;
    if (!isValid) return res.status(400).send("Bad Request ");
    const menuCategory = await prisma.menuCategory.create({
      data: { name, companyId },
    });
    if (!isAvailable) {
      const disabledLocationMenuCategoriesAdd =
        await prisma.disabledLocationMenuCategory.create({
          data: { locationId, menuCategoryId: menuCategory.id },
        });
      console.log("is cooming...");
      return res
        .status(200)
        .json({ menuCategory, disabledLocationMenuCategoriesAdd });
    }

    return res.status(200).json({ menuCategory });
  } else if (method === "PUT") {
    const { id, isAvailable, locationId, ...payload } = req.body;
    const menuCategory = await prisma.menuCategory.findFirst({ where: { id } });
    if (!menuCategory) return res.status(400).send("Bad request.");
    const updatedMenuCategory = await prisma.menuCategory.update({
      data: payload,
      where: { id },
    });
    if (locationId && isAvailable !== undefined) {
      if (isAvailable === false) {
        await prisma.disabledLocationMenuCategory.create({
          data: { locationId, menuCategoryId: id },
        });
      } else {
        const item = await prisma.disabledLocationMenuCategory.findFirst({
          where: { locationId, menuCategoryId: id },
        });
        item &&
          (await prisma.disabledLocationMenuCategory.delete({
            where: { id: item.id },
          }));
        // first of all --> find data row and get id then delete it
      }

      const disabledLocationMenuCategories =
        await prisma.disabledLocationMenuCategory.findMany({
          where: { locationId: locationId },
        });

      // const disabledLocationMenuCategoriesAdd =
      //   await prisma.disabledLocationMenuCategory.findMany({
      //     where: { menuCategoryId: id },
      //   });

      return res
        .status(200)
        .json({ updatedMenuCategory, disabledLocationMenuCategories });
    }
  } else if (method === "DELETE") {
    //backoffice/addon-category?id=${id} ---> id=1
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

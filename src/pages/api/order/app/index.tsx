// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const { tableId } = req.query;
  console.log("api/order/app ", tableId);

  const isValid = tableId;
  if (!isValid) return res.status(400).send("Bad Request");
  if (method === "GET") {
    const table = await prisma.table.findFirst({
      where: { id: Number(tableId) },
    });
    const location = await prisma.location.findFirst({
      where: { id: table?.locationId },
    });
    const companyId = location?.companyId;
    const company = await prisma.company.findFirst({
      where: { id: companyId },
    });
    let menuCategories = await prisma.menuCategory.findMany({
      where: { companyId: Number(companyId), isArchived: false },
    });

    const menuCategoryIds = menuCategories.map((item) => item.id);
    const disabledMenuCategoryIds = (
      await prisma.disabledLocationMenuCategory.findMany({
        where: {
          menuCategoryId: { in: menuCategoryIds },
          locationId: location?.id,
        },
      })
    ).map((item) => item.menuCategoryId);

    menuCategories = menuCategories.filter(
      (item) => !disabledMenuCategoryIds.includes(item.id)
    );

    const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: menuCategoryIds } },
    });
    const menuIds = menuCategoryMenus.map((item) => item.menuId);
    const disabledMenuIds = (
      await prisma.disabledLocationMenu.findMany({
        where: { menuId: { in: menuIds }, locationId: location?.id },
      })
    ).map((item) => item.menuId);
    const menus = (
      await prisma.menu.findMany({
        where: { id: { in: menuIds }, isArchived: false },
      })
    ).filter((item) => !disabledMenuIds.includes(item.id));
    const menuAddonCategories = await prisma.menuAddonCategory.findMany({
      where: { menuId: { in: menuIds } },
    });
    const addonCategoryIds = menuAddonCategories.map(
      (item) => item.addonCategoryId
    );
    const addonCategories = await prisma.addonCategory.findMany({
      where: { id: { in: addonCategoryIds }, isArchived: false },
    });
    const addons = await prisma.addon.findMany({
      where: {
        addonCategoryId: { in: addonCategoryIds },
        isArchived: false,
      },
    });
    const orders = await prisma.order.findMany({
      where: { tableId: Number(tableId) },
    });
    return res.status(200).json({
      company,
      locations: [location],
      menuCategories,
      menus,
      menuCategoryMenus,
      menuAddonCategories,
      addonCategories,
      addons,
      tables: [table],
      disabledLocationMenuCategories: [],
      disabledLocationMenus: [],
      orders,
    });
  }
  res.status(405).send("Method not allowed.");
}

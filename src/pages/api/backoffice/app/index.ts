import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req }); // the same with useSeeion(for client side) && getSession(for client side & server side)
  if (session) {
    const { user } = session;

    if (user) {
      const name = user.name as string;
      const email = user.email as string;
      const userFromDb = await prisma.user.findFirst({ where: { email } }); // {companyId, email, id, name} --> userTable
      // where email
      if (userFromDb) {
        const companyId = userFromDb.companyId; // companyId --> form userTable
        const company = await prisma.company.findFirst({
          where: { id: companyId },
        }); // company {} from companyTable
        const locations = await prisma.location.findMany({
          where: { companyId },
        }); // locations {} from locationsTable
        const locationIds = locations.map((item) => item.id); // locationIds from locationsTable
        const tables = await prisma.table.findMany({
          where: { locationId: { in: locationIds } }, // where locationId in locationIds
        });
        const menuCategories = await prisma.menuCategory.findMany({
          where: { companyId },
        });
        const menuCategoryIds = menuCategories.map((item) => item.id);
        const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
          where: { menuCategoryId: { in: menuCategoryIds } },
        });
        const menuCategoryMenuIds = menuCategoryMenus.map(
          (item) => item.menuId
        );
        const menus = await prisma.menu.findMany({
          where: { id: { in: menuCategoryMenuIds } },
        });
        const menuIds = menus.map((item) => item.id);
        const menuAddonCategories = await prisma.menuAddonCategory.findMany({
          where: { menuId: { in: menuIds } },
        });
        const addonCategories = await prisma.addonCategory.findMany({
          where: {
            id: {
              in: menuAddonCategories.map((item) => item.addonCategoryId),
            },
          },
        });
        const addons = await prisma.addon.findMany({
          where: {
            addonCategoryId: {
              in: addonCategories.map((item) => item.id),
            },
          },
        });
      } else {
        const newCompany = await prisma.company.create({
          data: {
            name: "Default company",
            street: "Default street",
            township: "Default twonship",
            city: "Default city",
          },
        });
        const newUser = await prisma.user.create({
          data: { name, email, companyId: newCompany.id },
        });
        const newLocation = await prisma.location.create({
          data: {
            name: "Default location",
            street: "Default location street",
            city: "Default location city",
            township: "Default location township",
            companyId: newCompany.id,
          },
        });
        const newTable = await prisma.table.create({
          data: {
            name: "Default table",
            locationId: newLocation.id,
            assetUrl: "",
          },
        });
        const newMenuCategory = await prisma.menuCategory.create({
          data: {
            name: "Default menu category",
            companyId: newCompany.id,
          },
        });
        const newMenu = await prisma.menu.create({
          data: { name: "Default menu", price: 1000 },
        });
        const newMenuCategoryMenu = await prisma.menuCategoryMenu.create({
          data: {
            menuId: newMenu.id,
            menuCategoryId: newMenuCategory.id,
          },
        });
        const newAddonCategory = await prisma.addonCategory.create({
          data: { name: "Default addon category" },
        });
        const newMenuAddonCategory = await prisma.menuAddonCategory.create({
          data: {
            addonCategoryId: newAddonCategory.id,
            menuId: newMenu.id,
          },
        });
        const newAddonsData = [
          { name: "Addon1", addonCategoryId: newAddonCategory.id },
          { name: "Addon2", addonCategoryId: newAddonCategory.id },
          { name: "Addon3", addonCategoryId: newAddonCategory.id },
        ];
        const newAddons = await prisma.$transaction(
          newAddonsData.map((addon) => prisma.addon.create({ data: addon }))
        );
        res.status(200).json({
          company: newCompany,
          menus: [newMenu],
          menuCategories: [newMenuCategory],
          locations: [newLocation],
          tables: [newTable],
          menuCategoryMenus: [newMenuCategoryMenu],
          addonCategories: [newAddonCategory],
          addons: [newAddons],
          menuAddonCategories: [newMenuAddonCategory],
        });
      }

      return res.status(200).send(name);
    } else {
      res.status(401).send("Unauthorized");
    }
  }
}

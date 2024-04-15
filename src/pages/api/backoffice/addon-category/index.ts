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
    return res.status(200).send("OK GET addon category");
  } else if (method === "POST") {
    const { name, isRequired, menuIds } = req.body;
    const isValid = name && isRequired !== undefined && menuIds.length;
    if (!isValid) return res.status(400).send("Bad Request...");
    const addonCategory = await prisma.addonCategory.create({
      data: { name, isRequired },
    });
    const menuAddonCategories = await prisma.$transaction(
      menuIds.map((menuId: number) =>
        prisma.menuAddonCategory.create({
          data: { menuId: menuId, addonCategoryId: addonCategory.id },
        })
      )
    );

    return res.status(200).json({ addonCategory, menuAddonCategories });
  } else if (method === "PUT") {
    const { id, name, menuIds, isRequired, companyId } = req.body;
    const exist = await prisma.addonCategory.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Request...");

    const updateAddonCategory = await prisma.addonCategory.update({
      data: { name, isRequired },
      where: { id },
    });
    // menuAddonCategory
    const menuAddonCategories = await prisma.menuAddonCategory.findMany({
      where: { addonCategoryId: id },
    }); /*
    menuAddonCategories : [
      { id: 10, menuId: 1 (1 new Data), addonCategoryId: 9 }, // old data
      { id: 11, menuId: 7 (2 new Data), addonCategoryId: 9 }  // old data
      { id: 12, menuId: (3 new Data), addonCategoryId: 9 }  // new data

*/
    const toRemove = menuAddonCategories.filter(
      (item) => !menuIds.includes(item.menuId)
    ); //  { id: 11, menuId: 7 (2 new Data), addonCategoryId: 9 }  // old data

    if (toRemove.length) {
      await prisma.menuAddonCategory.deleteMany({
        where: { id: { in: toRemove.map((item) => item.id) } },
      });
    }

    const toAdd = menuIds.filter(
      // [1,2,3] // newData
      (menuId: number) =>
        !menuAddonCategories.find((item) => item.menuId === menuId) // [1,7,3] (oldData) ===  [1,2,3] (newData) --> [1] === [1] --> !
    );
    // { id: 11, menuId: (2 new Data instand of 7), addonCategoryId: 9 }  // old data
    // { id: 11, menuId: (3 new Data), addonCategoryId: 9 }  // new data

    if (toAdd.length) {
      await prisma.$transaction(
        toAdd.map((menuId: number) =>
          prisma.menuAddonCategory.create({
            data: { menuId, addonCategoryId: id },
          })
        )
      );
    }

    console.log("toRemove :", toRemove);
    console.log("toAdd :", toAdd);

    console.log("menuAddonCategories :", menuAddonCategories);

    // const MenuAddonCategoriesMenuIds = existingMenuAddonCategories.map(
    //   (item) => item.menuId
    // );
    // const toRemoveMenuIds = MenuAddonCategoriesMenuIds.filter(
    //   (item: number) => item !== menuId
    // );
    // await prisma.menuAddonCategory.deleteMany({
    //   where: { id: { in: toRemoveMenuIds.map((item) => item) } },
    // });
    // const menuAddonCategories = await prisma.$transaction(
    //   menuIds.map((menuId: number) =>
    //     prisma.menuAddonCategory.create({
    //       data: { menuId: menuId, addonCategoryId: addonCategory.id },
    //     })
    //   )
    // );

    // existingMenuAddonCategories.map((item) =>
    //   item.menuId === menuId
    //     ? prisma.menuAddonCategory.delete({
    //         where: { menuId: menuId },
    //       })
    //     : prisma.menuAddonCategory.create({
    //         data: { menuId: menuId, addonCategoryId: id },
    //       })
    // );
    // console.log("existingMenuAddonCategories :", existingMenuAddonCategories);

    // await prisma.$transaction(
    //   existingMenuAddonCategories.map((item) =>
    //     {}
    //   )
    // );

    return res.status(200).json({ updateAddonCategory });
  } else if (method === "DELETE") {
    const addonCategoryId = Number(req.query.id);
    await prisma.addonCategory.update({
      data: { isArchived: true },
      where: { id: addonCategoryId },
    });
    return res.status(200).send("OK DELETE addon category");
  }
  return res.status(405).send("Invalid method");
}

//menuAddonCategories.map((item) => {
//   if (item.menuId !== menuId) {
//     const toDelete = prisma.menuAddonCategory.findFirst({
//       where: { id: item.id },
//     });
//   }
//   const toAdd = prisma.menuAddonCategory.create({
//     data: { menuId: menuId, addonCategoryId: id },
//   });
//   if (toAdd.length) {
//     await prisma.$transaction(
//       toAdd.map((menuId: number) =>
//         prisma.menuAddonCategory.create({
//           data: { menuId, addonCategoryId: id },
//         })
//       )
//     );
//   }
// });

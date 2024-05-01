// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { qrCodeImageUpload } from "@/utils/assetUpload";
import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// Serverless function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("OK GET table");
  } else if (method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.status(400).send("Bad Request...");
    let table = await prisma.table.create({
      data: { name, locationId, assetUrl: "" },
    });
    const assetUrl = await qrCodeImageUpload(table.id);
    table = await prisma.table.update({
      data: { assetUrl },
      where: { id: table.id },
    });
    return res.status(200).json({ table });
  } else if (method === "PUT") {
    const { id, ...payload } = req.body;
    const exist = await prisma.table.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Request...");
    const updateTable = await prisma.table.update({
      data: payload,
      where: { id },
    });
    return res.status(200).json({ updateTable });
  } else if (method === "DELETE") {
    const tableId = Number(req.query.id);
    const exist = await prisma.table.findFirst({ where: { id: tableId } });
    if (!exist) return res.status(400).send("Bad Request...");
    await prisma.table.update({
      data: { isArchived: true },
      where: { id: tableId },
    });
    return res.status(200).send("OK DELETE table");
  }
  return res.status(405).send("Invalid method");
}

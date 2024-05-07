import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const { id, name, street, township, city } = req.body;
    const exit = await prisma.company.findFirst({ where: { id } });
    if (!exit) return res.status(400).send("Bad Request...");
    const updateCompany = await prisma.company.update({
      data: { name, street, township, city },
      where: { id },
    });
    return res.status(200).json({ updateCompany });
  } else {
    return res.status(400).send("Bad Request...");
  }
}

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
    return res.status(200).send("OK GET location");
  } else if (method === "POST") {
    const { name, companyId, street, township, city } = req.body;
    const isValid = name && companyId && street && township && city;
    if (!isValid) return res.status(400).send("Bad Request...");
    const location = await prisma.location.create({
      data: { name, companyId, street, township, city },
    });
    return res.status(200).json({ location });
  } else if (method === "PUT") {
    const { id, name, street, township, city } = req.body;
    const exist = await prisma.location.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Request...");
    const location = await prisma.location.update({
      data: { id, name, street, township, city },
      where: { id },
    });

    return res.status(200).json({ location });
  } else if (method === "DELETE") {
    return res.status(200).send("OK DELETE location");
  }
  return res.status(405).send("Invalid method");
}

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
    const { name, price } = req.body;
    const isValid = name && price !== undefined;
    if (!isValid) return res.status(401).send("Bad request");
    const menu = await prisma.menu.create({ data: { name, price } });
    return res.status(200).json({ menu });
  } else if (method === "PUT") {
    return res.status(200).send("OK GEPUTT menu");
  } else if (method === "DELETE") {
    return res.status(200).send("OK DELETE menu");
  }
}

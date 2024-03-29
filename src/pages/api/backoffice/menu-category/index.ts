// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// Serverless function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  console.log(method);
  if (method === "GET") {
    return res.status(200).send("OK GET menu category");
  } else if (method === "POST") {
    const { name, companyId, isAvailable } = req.body;

    const isValid = name && companyId && isAvailable !== undefined;
    if (!isValid) return res.status(400).send("Bad Request ");
    const menuCategory = await prisma.menuCategory.create({
      data: { companyId, name, isAvailable },
    });
    return res.status(200).json({ menuCategory });
  } else if (method === "PUT") {
    return res.status(200).send("OK PUT menu category");
  } else if (method === "DELETE") {
    return res.status(200).send("OK DELETE menu category");
  }
  return res.status(405).send("Invalid method");
}

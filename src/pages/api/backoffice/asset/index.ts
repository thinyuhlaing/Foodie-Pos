import { NextApiRequest, NextApiResponse } from "next";
import { Request, Response } from "express";
import { assetUpload } from "@/utils/assetUpload";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: Request, res: Response) {
  const method = req.method;
  if (method === "POST") {
    assetUpload(req, res, (error) => {
      if (error) {
        return res.status(500).send("Internal Server Error...");
      }
      const file = req.file as Express.MulterS3.File;
      const assetUrl = file.location;
      return res.status(200).json({ assetUrl });
    });
  }
}

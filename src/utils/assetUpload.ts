import { config } from "@/config";
import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import QRCode from "qrcode";
const s3Client = new S3Client({
  endpoint: config.spaceEndpoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});
/* Photo */
export const assetUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "msquarefdc", //A bucket is a public cloud storage resource or container that stores objects or data.
    acl: "public-read",
    key: (request, file, cb) => {
      cb(
        null,
        `foodie-pos/msquarefdc-batch3/thin-yu-hlaing/${Date.now()}_${
          file.originalname
        }`
      );
    },
  }),
}).single("file");
/* QR CODE */
export const generateLinkForQRCode = (tableId: number) => {
  return `${config.orderAppUrl}?tableId=${tableId}`;
}; // ဝှက်စာ

export const qrCodeImageUpload = async (tableId: number) => {
  try {
    // toDataUrl --> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
    const qrImageData = await QRCode.toDataURL(generateLinkForQRCode(tableId), {
      scale: 20,
    });
    const input = {
      Bucket: "msquarefdc",
      Key: `foodie-pos/msquarefdc-batch3/thin-yu-hlaing/qrcode/tableId-${tableId}.png`,
      ACL: ObjectCannedACL.public_read,
      Body: Buffer.from(
        qrImageData.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ), // replace --> "hello".replace("e", "g") --> "hgllo"
    };
    const command = new PutObjectCommand(input);
    await s3Client.send(command);
    return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/foodie-pos/msquarefdc-batch3/thin-yu-hlaing/qrcode/tableId-${tableId}.png`;
  } catch (err) {
    console.log(err);
  }
};
// config.orderAppUrl --> http://localhost:3000/order

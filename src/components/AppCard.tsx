import { useAppSelector } from "@/store/hooks";
import { Box, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { createVariants } from "./DeleteDialog";
import { StaticImageData } from "next/image";

interface Props {
  img?: StaticImageData;
  icon?: ReactNode;
  title: string;
  href: string;
  isAvailable?: boolean;
  subtitle?: string;
  price?: number;
}

export default function AppCard({
  img,
  icon,
  title,
  href,
  subtitle,
  isAvailable,
  price,
}: Props) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "#000000" }}>
      <Box
        className="app-card"
        sx={{
          opacity: isAvailable === false ? 0.5 : 1,
        }}
      >
        {img ? (
          <img
            src={img?.src}
            className="w-24 h-24 bg-blue-300 rounded-full"
          ></img>
        ) : (
          icon
        )}
        <Box className="text-center  p-1 px-3">
          <Typography className="font-semibold text-lg">{title}</Typography>
          {price && (
            <Typography className="font-normal mt-1">MMK {price}</Typography>
          )}
        </Box>
      </Box>
    </Link>
  );
}

/*<Paper
        className="relative"
        onClick={() => console.log("click", isAvailable)}
        elevation={2}
        sx={{
          width: 170,
          height: 170,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: 2,
          opacity: isAvailable === false ? 0.4 : 1,
          cursor: "pointer",
        }}
      >
        <Typography sx={{ fontWeight: "700" }}>{title}</Typography>
      </Paper> */
/* <motion.button
          className="create-b"
          variants={createVariants}
          initial="start"
          whileHover="hover"
        >
          Order
        </motion.button> */

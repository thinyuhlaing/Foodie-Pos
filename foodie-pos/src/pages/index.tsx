import { Box, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box>
      <Typography variant="h1">Landing site</Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Link href={"/backoffice"}>
          <Typography variant="h3">Backoffice</Typography>
        </Link>
        <Link href={"/order"}>
          <Typography variant="h3">Order</Typography>
        </Link>
      </Box>
    </Box>
  );
}

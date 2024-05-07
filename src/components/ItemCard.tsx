import { useAppSelector } from "@/store/hooks";
import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  title: string;
  href: string;
  isAvailable?: boolean;
  subtitle?: string;
}

export default function ItemCard({
  icon,
  title,
  href,
  subtitle,
  isAvailable,
}: Props) {
  const { selectedLocation } = useAppSelector((state) => state.app);
  const selected = selectedLocation?.name === title ? true : false;

  return (
    <Link href={href} style={{ textDecoration: "none", color: "#000000" }}>
      <Paper
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
        {selected ? (
          <span className="absolute top-2 right-2 inline-flex h-5 w-5 rounded-full bg-light-createB opacity-75"></span>
        ) : (
          <span className="absolute top-2 right-2 inline-flex h-5 w-5 rounded-full bg-slate-300 opacity-75"></span>
        )}
        <Typography sx={{ fontWeight: "700" }}>{title}</Typography>
      </Paper>
    </Link>
  );
}

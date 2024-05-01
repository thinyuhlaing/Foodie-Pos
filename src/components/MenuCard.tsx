import PaidIcon from "@mui/icons-material/Paid";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Menu } from "@prisma/client";
import Link from "next/link";
import defaultImage from "../img/FoodiePos.jpg";

interface Props {
  menu: Menu;
  href: string | object;
  isAvailable?: boolean;
}

const MenuCard = ({ menu, href, isAvailable }: Props) => {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "#000000" }}>
      <Box
        className="app-card"
        sx={{
          opacity: isAvailable === false ? 0.5 : 1,
        }}
      >
        <img
          src={menu.assetUrl || defaultImage.src}
          className="w-full  h-40 overflow-hidden  rounded-xl"
        ></img>

        <Box className="text-center  p-1 px-3 ">
          <Typography className="font-semibold text-lg">{menu.name}</Typography>
          <Typography className="font-normal mt-1">MMK {menu.price}</Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default MenuCard;

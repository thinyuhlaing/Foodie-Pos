import BackofficeLayout from "@/components/BackofficeLayout";
import { useAppSelector } from "@/store/hooks";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const MenuDetail = () => {
  const router = useRouter();
  const menuId = Number(router.query.id);
  const { menus } = useAppSelector((state) => state.menu);
  const menu = menus.find((item) => item.id === menuId);

  if (!menu) {
    return (
      <BackofficeLayout>
        <Typography>Menu not found</Typography>
      </BackofficeLayout>
    );
  }

  return (
    <BackofficeLayout>
      <Typography>Menu Detail Page for id {menu.id}</Typography>
    </BackofficeLayout>
  );
};

export default MenuDetail;

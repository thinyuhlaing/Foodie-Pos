import MenuCard from "@/components/MenuCard";
import { useAppSelector } from "@/store/hooks";
import { appDataSelector } from "@/store/slices/appSlice";
import { Box, Tab, Tabs } from "@mui/material";
import { Menu, MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function OrderApp() {
  const { query, isReady, ...router } = useRouter();
  const [value, setValue] = useState(0);
  const { menuCategories, menus, menuCategoryMenus } =
    useAppSelector(appDataSelector);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory>();

  useEffect(() => {
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);
  const renderMenus = () => {
    const menuIds = menuCategoryMenus
      .filter((item) => item.menuCategoryId === selectedMenuCategory?.id)
      .map((item) => item.menuId);

    const validMenus = menuIds.map(
      (id) => menus.find((menu) => menu.id === id) as Menu
    );
    // .filter((item) => item !== undefined);

    // return menu.map((item) => <Box> {item?.name}</Box>);
    return validMenus.map((menu) => {
      const href = { pathname: `/order/menu/${menu.id}`, query };
      return <MenuCard key={menu.id} menu={menu} href={href} />;
    });
  };

  return (
    <Box sx={{ mt: 3, ml: 5 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={(evt, value) => {
            setValue(value);
          }} // just for UI
        >
          {menuCategories.map((item) => (
            <Tab
              key={item.id}
              label={item.name}
              sx={{ color: "#4C4C6D" }}
              //onClick={() => console.log("menuCategories", item)}
              onClick={() => setSelectedMenuCategory(item)}
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", mt: 2, flexWrap: "wrap" }}>
        {renderMenus()}
      </Box>
    </Box>
  );
}
//http://localhost:3000/order?tableId=3

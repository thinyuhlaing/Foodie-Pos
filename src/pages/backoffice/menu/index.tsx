import MenuDialog from "@/components/MenuDialog";
import { buttonVariants } from "@/components/TopBar";
import { useAppSelector } from "@/store/hooks";
import { CreateMenuPayload } from "@/types/menu";
import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import AppCard from "@/components/AppCard";
import Image from "../../../img/FoodiePos.jpg";
import MenuCard from "@/components/MenuCard";
function Menu() {
  const { menus } = useAppSelector((state) => state.menu);
  const [open, setOpen] = useState(false);

  const [newMenu, setNewMenu] = useState<CreateMenuPayload>({
    name: "",
    price: 0,
    menuCategoryIds: [],
  });
  const { selectedLocation } = useAppSelector((state) => state.app);

  const { disabledLocationMenus } = useAppSelector(
    (state) => state.disabledLocationMenu
  );
  return (
    <>
      <motion.button
        className="button "
        variants={buttonVariants}
        initial="start"
        whileHover="hover"
        onClick={() => setOpen(true)}
      >
        Menu
      </motion.button>

      <Box className="flex flex-wrap">
        {menus.map((menu) => {
          const isAvailable = disabledLocationMenus.find(
            (item) =>
              item.menuId === menu.id &&
              item.locationId === selectedLocation?.id
          )
            ? false
            : true;
          return (
            <MenuCard
              key={menu.id}
              menu={menu}
              href={`/backoffice/menu/${menu.id}`}
              isAvailable={isAvailable}
            />
          );
        })}
      </Box>
      <MenuDialog
        open={open}
        setOpen={setOpen}
        newMenu={newMenu}
        setNewMenu={setNewMenu}
      />
    </>
  );
}

export default Menu;

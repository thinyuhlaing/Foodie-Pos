import ItemCard from "@/components/ItemCard";
import Layout_Back from "@/components/Layout_Back";
import MenuDialog from "@/components/MenuDialog";
import { buttonVariants } from "@/components/TopBar";
import { useAppSelector } from "@/store/hooks";
import { CreateMenuPayload } from "@/types/menu";
import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";

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
  console.log(newMenu);
  return (
    <Layout_Back>
      <motion.button
        className="button"
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
            <ItemCard
              key={menu.id}
              icon={<CategoryIcon />}
              title={menu.name}
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
    </Layout_Back>
  );
}

export default Menu;

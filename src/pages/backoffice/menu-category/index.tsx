import MenuCategoryDialog from "@/components/MenuCategoryDialog";
import { useAppSelector } from "@/store/hooks";
import { CreateMenuCategoryPayload } from "@/types/menuCategory";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import { useRouter } from "next/router";
import AppCard from "@/components/AppCard";
import { appDataSelector } from "@/store/slices/appSlice";
import { shallowEqual } from "react-redux";
import { buttonVariants } from "@/components/TopBar";
import { motion } from "framer-motion";
const MenuCategory = () => {
  const {
    menuCategories,
    disabledLocationMenuCategories,
    selectedLocation,
    company,
  } = useAppSelector(appDataSelector, shallowEqual);

  const [open, setOpen] = useState<boolean>(false);
  const [newMenuCategory, setNewMenuCategory] =
    useState<CreateMenuCategoryPayload>({
      name: "",
      isAvailable: false,
      companyId: company?.id, //undefined
      locationId: selectedLocation?.id,
    });
  // const router = useRouter();
  // console.log("router:query", rounter.query);
  // console.log("router:pathname", rounter.pathname);
  console.log("disabledLocationMenuCategories", disabledLocationMenuCategories);

  useEffect(() => {
    if (company && selectedLocation) {
      setNewMenuCategory({
        name: "",
        isAvailable: false,
        companyId: company.id,
        locationId: selectedLocation.id,
      });
    }
  }, [company, selectedLocation, disabledLocationMenuCategories]);

  return (
    <>
      <motion.button
        className="button"
        variants={buttonVariants}
        initial="start"
        whileHover="hover"
        onClick={() => setOpen(true)}
      >
        MenuCategory
      </motion.button>
      <Box className="flex flex-wrap ">
        {menuCategories.map((menuCategoy) => {
          const isAvailable = disabledLocationMenuCategories.find(
            (item) =>
              item.menuCategoryId === menuCategoy.id &&
              item.locationId === selectedLocation?.id
          )
            ? false
            : true;
          return (
            <AppCard
              key={menuCategoy.id}
              // icon={<CategoryIcon />}
              title={menuCategoy.name}
              isAvailable={isAvailable}
              href={`/backoffice/menu-category/${menuCategoy.id}`}
            />
          );
        })}
      </Box>
      <MenuCategoryDialog
        open={open}
        setOpen={setOpen}
        newMenuCategory={newMenuCategory}
        setNewMenuCategory={setNewMenuCategory}
      />
    </>
  );
};

export default MenuCategory;

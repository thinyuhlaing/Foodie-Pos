import ItemCard from "@/components/ItemCard";
import Layout_Back from "@/components/Layout_Back";
import MenuCategoryDialog from "@/components/MenuCategoryDialog";
import { useAppSelector } from "@/store/hooks";
import { CreateMenuCategoryPayload } from "@/types/menuCategory";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import { useRouter } from "next/router";
const MenuCategory = () => {
  const { company } = useAppSelector((state) => state.company);
  const { menuCategories } = useAppSelector((state) => state.menuCategory);
  const { selectedLocation } = useAppSelector((state) => state.app);
  const { disabledLocationMenuCategories } = useAppSelector(
    (state) => state.disabledLocationMenuCategory
  );

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
    <Layout_Back>
      <Button
        variant="contained"
        className="button"
        onClick={() => setOpen(true)}
      >
        MenuCategory
      </Button>
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
            <ItemCard
              key={menuCategoy.id}
              icon={<CategoryIcon />}
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
    </Layout_Back>
  );
};

export default MenuCategory;

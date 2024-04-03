import ItemCard from "@/components/ItemCard";
import Layout_Back from "@/components/Layout_Back";
import MenuCategoryDialog from "@/components/MenuCategoryDialog";
import { useAppSelector } from "@/store/hooks";
import { CreateMenuCategoryPayload } from "@/types/menuCategory";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import { useRouter } from "next/router";
const MenuCategory = () => {
  const { company } = useAppSelector((state) => state.company);
  const { menuCategories } = useAppSelector((state) => state.menuCategory);
  const [open, setOpen] = useState<boolean>(false);
  const [newMenuCategory, setNewMenuCategory] =
    useState<CreateMenuCategoryPayload>({
      name: "",
      isAvailable: false,
      companyId: company?.id,
    });
  // const router = useRouter();
  // console.log("router:query", rounter.query);
  // console.log("router:pathname", rounter.pathname);

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
        {menuCategories.map((item) => {
          return (
            <ItemCard
              key={item.id}
              icon={<CategoryIcon />}
              title={item.name}
              isAvailable={item.isAvailable}
              href={`/backoffice/menu-category/${item.id}`}
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

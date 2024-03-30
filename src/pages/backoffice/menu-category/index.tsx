import Layout_Back from "@/components/Layout_Back";
import MenuCategoryDialog from "@/components/MenuCategoryDialog";
import { useAppSelector } from "@/store/hooks";
import { CreateMenuCategoryPayload } from "@/types/menuCategory";
import { Button } from "@mui/material";
import { useState } from "react";

const MenuCategory = () => {
  const { company } = useAppSelector((state) => state.company);

  const [open, setOpen] = useState<boolean>(false);
  const [newMenuCategory, setNewMenuCategory] =
    useState<CreateMenuCategoryPayload>({
      name: "",
      isAvailable: true,
      companyId: company?.id,
    });
  return (
    <Layout_Back>
      <Button
        variant="contained"
        className="button"
        onClick={() => setOpen(true)}
      >
        MenuCategory
      </Button>

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

import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ClassIcon from "@mui/icons-material/Class";
import AddonCategoryDialog from "@/components/AddonCategoryDialog";
import { CreateAddonCategoryPayload } from "@/types/addonCategory";
import { useAppSelector } from "@/store/hooks";
import AppCard from "@/components/AppCard";
import { motion } from "framer-motion";
import { createVariants } from "@/components/DeleteDialog";

export default function AddonCategory() {
  const { addonCategories } = useAppSelector((state) => state.addonCategory);
  const [open, setOpen] = useState(false);
  const [newAddonCategory, setNewAddonCategory] =
    useState<CreateAddonCategoryPayload>({
      name: "",
      isRequired: false,
      menuIds: [],
    });

  return (
    <>
      <motion.button
        className=" button"
        variants={createVariants}
        initial="start"
        whileHover="hover"
        onClick={() => setOpen(true)}
      >
        AddonCategory
      </motion.button>
      <Box className="flex flex-wrap ">
        {addonCategories.map((addonCategory) => {
          return (
            <AppCard
              key={addonCategory.id}
              //icon={<ClassIcon />}
              title={addonCategory.name}
              href={`/backoffice/addon-category/${addonCategory.id}`}
            />
          );
        })}
      </Box>
      <AddonCategoryDialog
        open={open}
        setOpen={setOpen}
        newAddonCategory={newAddonCategory}
        setNewAddonCategory={setNewAddonCategory}
      />
    </>
  );
}

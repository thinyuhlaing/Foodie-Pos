import AddonDialog from "@/components/AddonDialog";
import AppCard from "@/components/AppCard";
import { createVariants } from "@/components/DeleteDialog";
import Layout_Back from "@/components/Layout_Back";
import { useAppSelector } from "@/store/hooks";
import { CreateAddonPayload } from "@/types/addon";
import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import EggIcon from "@mui/icons-material/Egg";
function Addons() {
  const [selected, setSelected] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  //const { addonCategories } = useAppSelector((state) => state.addonCategory);
  const { addons } = useAppSelector((state) => state.addon);

  const [newAddon, setNewAddon] = useState<CreateAddonPayload>({
    name: "",
    price: 0,
    addonCategoryId: undefined,
  });

  return (
    <Layout_Back>
      <motion.button
        className="button"
        variants={createVariants}
        initial="start"
        whileHover="hover"
        onClick={() => setOpen(true)}
      >
        Addons
      </motion.button>
      <Box className="flex flex-wrap ">
        {addons.map((addon) => {
          return (
            <AppCard
              key={addon.id}
              icon={<EggIcon />}
              title={addon.name}
              href={`/backoffice/addon/${addon.id}`}
            />
          );
        })}
      </Box>
      <AddonDialog
        open={open}
        setOpen={setOpen}
        newAddon={newAddon}
        setNewAddon={setNewAddon}
      />
    </Layout_Back>
  );
}

export default Addons;

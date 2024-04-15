import AddonDialog from "@/components/AddonDialog";
import AppCard from "@/components/AppCard";
import { createVariants } from "@/components/DeleteDialog";
import Layout_Back from "@/components/Layout_Back";
import { useAppSelector } from "@/store/hooks";
import { CreateAddonPayload } from "@/types/addon";
import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import TableBarIcon from "@mui/icons-material/TableBar";
import TableDialog from "@/components/TableDialog";
import { CreateTablePayload } from "@/types/table";
function Addons() {
  const [selected, setSelected] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  //const { addonCategories } = useAppSelector((state) => state.addonCategory);
  const { tables } = useAppSelector((state) => state.table);

  const { locations } = useAppSelector((state) => state.location);
  const [newTable, setNewTable] = useState<CreateTablePayload>({
    name: "",
    locationId: undefined,
    assetUrl: "",
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
        Tables
      </motion.button>
      <Box className="flex flex-wrap ">
        {tables.map((table) => {
          return (
            <AppCard
              key={table.id}
              icon={<TableBarIcon />}
              title={table.name}
              href={`/backoffice/table/${table.id}`}
            />
          );
        })}
      </Box>
      <TableDialog
        open={open}
        setOpen={setOpen}
        newTable={newTable}
        setNewTable={setNewTable}
      />
    </Layout_Back>
  );
}

export default Addons;

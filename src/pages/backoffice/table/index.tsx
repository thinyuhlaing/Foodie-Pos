import AddonDialog from "@/components/AddonDialog";
import AppCard from "@/components/AppCard";
import { createVariants } from "@/components/DeleteDialog";
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
  // const handleQRImagePrint = (assetUrl: string) => {
  //   // assetUrl --> https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/foodie-pos/msquarefdc-batch3/thin-yu-hlaing/qrcode/tableId-3.png
  //   const imageWindow = window.open("");
  //   imageWindow?.document.write(
  //     `<html><head><title>Print Image</title></head><body style="text-align: center;"><img src="${assetUrl}" onload="window.print()" /></body></html>`
  //   );
  //   // const imageWindow = window.open("");
  //   // imageWindow?.document.write(
  //   //   `<html><head><title>Print Image</title></head><body style="text-align: center;"><img src="${assetUrl}" onload="window.print()" /></body></html>`
  //   // );
  // };

  const handleQRImagePrint = (assetUrl: string) => {
    // Open a new window
    const imageWindow = window.open("");
    if (imageWindow === null) return;
    // When the window is loaded, print the image
    imageWindow.onload = () => {
      imageWindow.document.write(
        `<html><head><title>Print Image</title></head><body style="text-align: center;"><img src="${assetUrl}" onload="window.print()"/></body></html>`
      );
    };

    //why doesn't work like this?
    // const imageWindow = window.open("");
    // imageWindow?.document.write(
    //   `<html><head><title>Print Image</title></head><body style="text-align: center;"><img src="${assetUrl}" onload="window.print()" /></body></html>`
    // );
  };

  return (
    <>
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
          console.log("tableassetUrl", table.assetUrl);
          return (
            <Box className="flex flex-col  justify-between items-center  p-3  h-80">
              <AppCard
                key={table.id}
                //   icon={<TableBarIcon />}
                title={table.name}
                href={`/backoffice/table/${table.id}`}
              />
              <motion.button
                className="w-1/2 bg-light-createB text-light-text p-2 rounded-xl"
                variants={createVariants}
                initial="start"
                whileHover="hover"
                onClick={() => handleQRImagePrint(table.assetUrl)}
              >
                Print QR
              </motion.button>
            </Box>
          );
        })}
      </Box>
      <TableDialog
        open={open}
        setOpen={setOpen}
        newTable={newTable}
        setNewTable={setNewTable}
      />
    </>
  );
}

export default Addons;

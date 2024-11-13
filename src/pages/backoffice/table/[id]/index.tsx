import DeleteDialog, { createVariants } from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showSnackbar } from "@/store/slices/appSnackbarSlice";
import { updateMenuCategory } from "@/store/slices/menuCategorySlice";
import { deleteMenu, updateMenu } from "@/store/slices/menuSlice";
import { UpdateMenuPayload } from "@/types/menu";
//import { updateMenuCategory } from "@/store/slices/menuCategorySlice";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MenuCategory } from "@prisma/client";
import MultiSelect from "@/components/MultiSelect";
import { UpdateAddonCategoryPayload } from "@/types/addonCategory";
import {
  deleteAddonCategory,
  updateAddonCategory,
} from "@/store/slices/addonCategorySlice";
import { UpdateAddonPayload } from "@/types/addon";
import SingleSelect from "@/components/SingleSelect";
import { deleteAddon, updateAddon } from "@/store/slices/addonSlice";
import { UpdateTablePayload } from "@/types/table";
import { deleteTable, updateTable } from "@/store/slices/tableSlice";
import { motion } from "framer-motion";
const AddonCategoryDetail = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<UpdateTablePayload>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number>();
  const tableId = Number(router.query.id); //router:query {id: '1'}
  const { tables } = useAppSelector((state) => state.table);
  const table = tables.find((item) => item.id === tableId);
  const { locations } = useAppSelector((state) => state.location);

  useEffect(() => {
    if (table) {
      setUpdateData({ ...table });
      setSelected(table.locationId);
    }
  }, [table]);

  useEffect(() => {
    if (updateData && selected) {
      setUpdateData({
        ...updateData,
        locationId: selected,
      });
    }
  }, [selected]);

  if (!updateData) {
    return (
      <>
        <Typography> Table not found</Typography>
      </>
    );
  }
  const handleUpdate = () => {
    // const shouldUpdate =
    //   updateData?.name !== menu?.name || updateData?.price !== menu?.price;
    // if (!shouldUpdate) {
    //   return router.push("/backoffice/menu");
    // }
    updateData &&
      dispatch(
        updateTable({
          ...updateData,
          onSuccess: () => {
            dispatch(
              showSnackbar({
                type: "success",
                message: "Updated table  successfully",
              })
            );
            router.push("/backoffice/table");
          },
          onError: () => {
            dispatch(
              showSnackbar({
                type: "error",
                message: "Error occurred when updating table",
              })
            );
          },
        })
      );
  };
  return (
    <>
      <Box className=" flex justify-between">
        <Box className="flex flex-col w-80  justify-between h-[15rem] ">
          <TextField
            value={updateData.name}
            onChange={(evt) =>
              setUpdateData({ ...updateData, name: evt.target.value })
            }
          />
          <SingleSelect
            title="Addon Category"
            selected={selected}
            setSelected={setSelected}
            items={locations}
          />
          <motion.button
            className="create-b mt-5"
            variants={createVariants}
            initial="start"
            whileHover="hover"
            onClick={handleUpdate}
          >
            Update
          </motion.button>
        </Box>
        <Button
          variant="outlined"
          color="error"
          className="w-fit h-fit flex justify-start "
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
      </Box>
      <DeleteDialog
        title="Delete Menu"
        content="are you sure you want to delete this menu?"
        open={open}
        setOpen={setOpen}
        handleDelete={() => {
          dispatch(deleteTable({ id: tableId }));
          setOpen(false);
          router.push("/backoffice/table");
        }}
      />
    </>
  );
};

export default AddonCategoryDetail;

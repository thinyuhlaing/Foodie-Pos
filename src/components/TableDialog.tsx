import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showSnackbar } from "@/store/slices/appSnackbarSlice";
import { createMenuCategroy } from "@/store/slices/menuCategorySlice";
import { CreateMenuCategoryPayload } from "@/types/menuCategory";
import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cancleVariants, createVariants } from "./DeleteDialog";
import { CreateAddonCategoryPayload } from "@/types/addonCategory";
import MultiSelect from "./MultiSelect";
import { createAddonCategroy } from "@/store/slices/addonCategorySlice";
import { CreateAddonPayload } from "@/types/addon";
import SingleSelect from "./SingleSelect";
import { createAddon } from "@/store/slices/addonSlice";
import { CreateTablePayload } from "@/types/table";
import { createTable } from "@/store/slices/tableSlice";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newTable: CreateTablePayload;
  setNewTable: Dispatch<SetStateAction<CreateTablePayload>>;
}

export default function TableDialog({
  open,
  setOpen,
  newTable,
  setNewTable,
}: Props) {
  const { locations } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number>();

  useEffect(() => {
    setNewTable({ ...newTable, locationId: selected });
  }, [selected]);

  const handleCreateTable = () => {
    //   const isValid = newMenuCategory.name;
    //   if (!isValid) return;
    dispatch(
      createTable({
        ...newTable,
        onSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "created table successfully",
            })
          );
          setOpen(false);
        },
        onError: () => {
          dispatch(
            showSnackbar({
              type: "error",
              message: "Error occurred when creating table",
            })
          );
        },
      })
    );
  };
  console.log("newTable :", newTable);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box className="bg-[#FBF6EE]">
        <DialogTitle>New Table</DialogTitle>
        <DialogContent className="w-80">
          <Box>
            <TextField
              placeholder="name "
              className="w-full mb-5"
              onChange={(evt) =>
                setNewTable({
                  ...newTable,
                  name: evt.target.value,
                })
              }
            />

            <SingleSelect
              title="Location"
              selected={selected}
              setSelected={setSelected}
              items={locations}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <motion.button
            onClick={() => setOpen(false)}
            className="cancle-b"
            variants={cancleVariants}
            initial="start"
            whileHover="hover"
          >
            Cancel
          </motion.button>
          <motion.button
            className="create-b"
            variants={createVariants}
            initial="start"
            whileHover="hover"
            onClick={handleCreateTable}
          >
            Create
          </motion.button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

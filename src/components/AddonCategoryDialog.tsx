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

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newAddonCategory: CreateAddonCategoryPayload;
  setNewAddonCategory: Dispatch<SetStateAction<CreateAddonCategoryPayload>>;
}

export default function AddonCategoryDialog({
  open,
  setOpen,
  newAddonCategory,
  setNewAddonCategory,
}: Props) {
  const { addonCategories } = useAppSelector((state) => state.addonCategory);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number[]>([]);
  const { menus } = useAppSelector((state) => state.menu);

  console.log("newAddonCategory", newAddonCategory);
  useEffect(() => {
    setNewAddonCategory({ ...newAddonCategory, menuIds: selected });
  }, [selected]);

  const handleCreateMenuCategory = () => {
    //   const isValid = newMenuCategory.name;
    //   if (!isValid) return;
    dispatch(
      createAddonCategroy({
        ...newAddonCategory,
        onSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "created addon category successfully",
            })
          );
          setOpen(false);
        },
        onError: () => {
          dispatch(
            showSnackbar({
              type: "error",
              message: "Error occurred when creating ‌addon category",
            })
          );
        },
      })
    );
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box className="bg-[#FBF6EE]">
        <DialogTitle>New Addon Category</DialogTitle>
        <DialogContent className="w-80">
          <Box>
            <TextField
              placeholder="name"
              className="w-full mb-5"
              onChange={(evt) =>
                setNewAddonCategory({
                  ...newAddonCategory,
                  name: evt.target.value,
                })
              }
            />

            <MultiSelect
              title="Menu"
              selected={selected}
              setSelected={setSelected}
              items={menus}
            />
            <FormControlLabel
              className="w-full mt-3"
              label="Required"
              control={<Checkbox />}
              onChange={(evt, value) =>
                setNewAddonCategory({ ...newAddonCategory, isRequired: value })
              }
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
            onClick={handleCreateMenuCategory}
          >
            Create
          </motion.button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

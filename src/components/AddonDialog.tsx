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
import { createAddon } from "@/store/slices/addonSlice ";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newAddon: CreateAddonPayload;
  setNewAddon: Dispatch<SetStateAction<CreateAddonPayload>>;
}

export default function AddonDialog({
  open,
  setOpen,
  newAddon,
  setNewAddon,
}: Props) {
  const { addonCategories } = useAppSelector((state) => state.addonCategory);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number>();
  console.log("newAddon :", newAddon);

  useEffect(() => {
    setNewAddon({ ...newAddon, addonCategoryId: selected });
  }, [selected]);

  const handleCreateAddon = () => {
    //   const isValid = newMenuCategory.name;
    //   if (!isValid) return;
    dispatch(
      createAddon({
        ...newAddon,
        onSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "created addon successfully",
            })
          );
          setOpen(false);
        },
        onError: () => {
          dispatch(
            showSnackbar({
              type: "error",
              message: "Error occurred when creating ‌addon",
            })
          );
        },
      })
    );
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box className="bg-[#FBF6EE]">
        <DialogTitle>New Addon</DialogTitle>
        <DialogContent className="w-80">
          <Box>
            <TextField
              placeholder="name "
              className="w-full mb-5"
              onChange={(evt) =>
                setNewAddon({
                  ...newAddon,
                  name: evt.target.value,
                })
              }
            />
            <TextField
              placeholder="price"
              className="w-full mb-5"
              onChange={(evt) =>
                setNewAddon({
                  ...newAddon,
                  price: Number(evt.target.value),
                })
              }
            />

            <SingleSelect
              title="Addon Category"
              selected={selected}
              setSelected={setSelected}
              items={addonCategories}
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
            onClick={handleCreateAddon}
          >
            Create
          </motion.button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

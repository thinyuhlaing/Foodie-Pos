import { useAppDispatch } from "@/store/hooks";
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
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newMenuCategory: CreateMenuCategoryPayload;
  setNewMenuCategory: Dispatch<SetStateAction<CreateMenuCategoryPayload>>;
}

export default function MenuCategoryDialog({
  open,
  setOpen,
  newMenuCategory,
  setNewMenuCategory,
}: Props) {
  const dispatch = useAppDispatch();
  const handleCreateMenuCategory = () => {
    const isValid = newMenuCategory.name;
    if (!isValid) return;
    dispatch(
      createMenuCategroy({
        ...newMenuCategory,
        onSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "Menu category created successfully",
            })
          );
          setOpen(false);
        },
        onError: () => {
          dispatch(
            showSnackbar({
              type: "error",
              message: "Error occurred when creating menu category",
            })
          );
        },
      })
    );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box className="bg-[#FBF6EE]">
        <DialogTitle>New Menu Category</DialogTitle>
        <DialogContent className="w-80">
          <Box>
            <TextField
              placeholder="name"
              sx={{ width: "100%", mb: 2 }}
              onChange={(evt) =>
                setNewMenuCategory({
                  ...newMenuCategory,
                  name: evt.target.value,
                })
              }
            />
            <FormControlLabel
              label="Available"
              control={<Checkbox />}
              onChange={(evt, value) =>
                setNewMenuCategory({ ...newMenuCategory, isAvailable: value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <motion.button
            onClick={() => setOpen(false)}
            className="cancle-b"
            initial={{ y: 0 }}
            whileHover={{
              y: -3,
            }}
          >
            Cancel
          </motion.button>
          <motion.button
            className="create-b"
            initial={{ y: 0 }}
            whileHover={{
              y: -3,
              textShadow: "0px 0px 8px rgb(74, 122, 54)",
              boxShadow: "0px 0px 10px rgb(114, 164, 93)",
            }}
            onClick={handleCreateMenuCategory}
          >
            Create
          </motion.button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

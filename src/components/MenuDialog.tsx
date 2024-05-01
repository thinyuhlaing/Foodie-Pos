import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { CreateMenuPayload } from "@/types/menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showSnackbar } from "@/store/slices/appSnackbarSlice";
import { createMenu } from "@/store/slices/menuSlice";
import { useEffect, useState } from "react";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import MultiSelect from "./MultiSelect";
import FileDropZone from "./FlieDropZone";
import { uploadAsset } from "@/store/slices/appSlice";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newMenu: CreateMenuPayload;
  setNewMenu: React.Dispatch<React.SetStateAction<CreateMenuPayload>>;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function MenuDialog({
  open,
  setOpen,
  newMenu,
  setNewMenu,
}: Props) {
  const dispatch = useAppDispatch();
  const { menuCategories } = useAppSelector((state) => state.menuCategory);
  const [selected, setSelected] = useState<number[]>([]);
  const router = useRouter();
  const [menuImage, setMenuImage] = useState<File>();

  const handleCreateMenu = () => {
    const isValid = newMenu.name && newMenu.menuCategoryIds.length > 0;
    console.log("isValid", isValid);
    if (!isValid) return;

    if (menuImage) {
      dispatch(
        uploadAsset({
          file: menuImage,
          onSuccess: (assetUrl) => {
            newMenu.assetUrl = assetUrl;
            dispatch(
              createMenu({
                ...newMenu,
                onSuccess: () => {
                  dispatch(
                    showSnackbar({
                      type: "success",
                      message: "Menu created successfully",
                    })
                  );
                  setOpen(false);
                },

                onError: () => {
                  dispatch(
                    showSnackbar({
                      type: "error",
                      message: "Error occurred when creating menu",
                    })
                  );
                },
              })
            );
          },
        })
      );
      // const response = await;
    } else {
      dispatch(
        createMenu({
          ...newMenu,
          onSuccess: () => {
            dispatch(
              showSnackbar({
                type: "success",
                message: "Menu created successfully",
              })
            );
            setOpen(false);
          },

          onError: () => {
            dispatch(
              showSnackbar({
                type: "error",
                message: "Error occurred when creating menu",
              })
            );
          },
        })
      );
    }
  };

  console.log("newMenu", newMenu);
  useEffect(() => {
    setNewMenu({ ...newMenu, menuCategoryIds: selected });
  }, [selected]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box className="bg-[#FBF6EE]">
        <DialogTitle>New Menu</DialogTitle>
        <DialogContent className="w-[28rem]">
          <Box>
            <TextField
              placeholder="name"
              sx={{ width: "100%", mb: 3 }}
              onChange={(evt) =>
                setNewMenu({ ...newMenu, name: evt.target.value })
              }
            />
            <TextField
              type="number"
              placeholder="price"
              sx={{ width: "100%", mb: 3 }}
              onChange={(evt) =>
                setNewMenu({ ...newMenu, price: Number(evt.target.value) })
              }
            />
            <MultiSelect
              title="Menu Category"
              selected={selected}
              setSelected={setSelected}
              items={menuCategories}
            />
          </Box>
          <FileDropZone onDrop={(files) => setMenuImage(files[0])} />
          {menuImage && (
            <Chip
              label={menuImage.name}
              onDelete={() => setMenuImage(undefined)}
            ></Chip>
          )}
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
            onClick={handleCreateMenu}
          >
            Create
          </motion.button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

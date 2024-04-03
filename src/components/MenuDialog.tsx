import {
  Box,
  Button,
  Checkbox,
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
import { useState } from "react";
import { MenuCategory } from "@prisma/client";

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
  // const [selected, setSelected] = useState<number[]>([]);

  const handleCreateMenu = () => {
    const isValid =
      newMenu.name && newMenu.price && newMenu.menuCategoryIds.length > 0;
    if (!isValid) return;
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
  };
  console.log(newMenu);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box className="bg-[#FBF6EE]">
        <DialogTitle>New Menu</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <Box>
            <TextField
              placeholder="name"
              sx={{ width: "100%", mb: 2 }}
              onChange={(evt) =>
                setNewMenu({ ...newMenu, name: evt.target.value })
              }
            />
            <TextField
              type="number"
              placeholder="price"
              sx={{ width: "100%", mb: 2 }}
              onChange={(evt) =>
                setNewMenu({ ...newMenu, price: Number(evt.target.value) })
              }
            />
            <FormControl className=" w-full">
              <InputLabel>Menu Category</InputLabel>
              <Select
                multiple
                value={newMenu.menuCategoryIds}
                // input={<OutlinedInput label="Menu Category" />}
                onChange={(evt) => {
                  const selected = evt.target.value as number[];
                  setNewMenu({ ...newMenu, menuCategoryIds: selected });
                }}
                renderValue={() => {
                  const selectedMenuCategories = newMenu.menuCategoryIds.map(
                    (selectedId) =>
                      menuCategories.find(
                        (item) => item.id === selectedId
                      ) as MenuCategory
                  );
                  return selectedMenuCategories
                    .map((item) => item.name)
                    .join(", ");
                }}
              >
                {menuCategories.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {/*value*/}
                      <Checkbox
                        checked={newMenu.menuCategoryIds.includes(item.id)}
                      />
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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
            onClick={handleCreateMenu}
          >
            Create
          </motion.button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

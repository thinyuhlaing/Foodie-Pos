import DeleteDialog, { createVariants } from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showSnackbar } from "@/store/slices/appSnackbarSlice";
import {
  deleteMenuCategory,
  updateMenuCategory,
} from "@/store/slices/menuCategorySlice";
//import { updateMenuCategory } from "@/store/slices/menuCategorySlice";
import { UpdateMenuCategoryPayload } from "@/types/menuCategory";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuCategoryDetail = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<UpdateMenuCategoryPayload>();
  const router = useRouter();
  const menuCategoryId = Number(router.query.id); //router:query {id: '1'}
  const { menuCategories } = useAppSelector((state) => state.menuCategory);
  const { selectedLocation } = useAppSelector((state) => state.app);
  const { disabledLocationMenuCategories } = useAppSelector(
    (state) => state.disabledLocationMenuCategory
  );
  const isAvailable = disabledLocationMenuCategories.find(
    (item) =>
      item.menuCategoryId === menuCategoryId &&
      item.locationId === selectedLocation?.id
  )
    ? false
    : true; // to check location
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (menuCategory) {
      setUpdateData({
        ...menuCategory,
        isAvailable,
        locationId: selectedLocation?.id,
      });
    }
  }, [menuCategory]);

  const handleUpdate = () => {
    const shouldUpdate =
      updateData?.name !== menuCategory?.name ||
      updateData?.isAvailable !== isAvailable;
    if (!shouldUpdate) {
      return router.push("/backoffice/menu-category");
    }
    updateData &&
      dispatch(
        updateMenuCategory({
          ...updateData,
          onSuccess: () => {
            dispatch(
              showSnackbar({
                type: "success",
                message: "Updated menu category created successfully",
              })
            );
            router.push("/backoffice/menu-category");
          },
        })
      );
  };

  if (!updateData) {
    return (
      <>
        <Typography>Menu category not found</Typography>
      </>
    );
  }
  return (
    <>
      <Box className=" flex justify-between">
        <Box className="flex flex-col w-80  justify-between h-48">
          <TextField
            value={updateData.name}
            onChange={(evt) =>
              setUpdateData({ ...updateData, name: evt.target.value })
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={updateData.isAvailable}
                onChange={(evt, value) =>
                  setUpdateData({ ...updateData, isAvailable: value })
                }
              />
            }
            className="text-light-text"
            label="Available"
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
        title="Delete Menu Category"
        content="are you sure you want to delete?"
        open={open}
        setOpen={setOpen}
        handleDelete={() => {
          dispatch(deleteMenuCategory({ id: menuCategoryId }));
          setOpen(false);
          router.push("/backoffice/menu-category");
        }}
      />
    </>
  );
};

export default MenuCategoryDetail;

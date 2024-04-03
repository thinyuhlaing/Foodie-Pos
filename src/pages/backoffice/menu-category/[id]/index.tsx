import DeleteDialog from "@/components/DeleteDialog";
import Layout_Back from "@/components/Layout_Back";
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuCategoryDetail = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<UpdateMenuCategoryPayload>();
  const router = useRouter();
  const menuCategoryId = Number(router.query.id); //router:query {id: '1'}
  const { menuCategories } = useAppSelector((state) => state.menuCategory);
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (menuCategory) {
      setUpdateData(menuCategory);
    }
  }, []);

  const handleUpdate = () => {
    const shouldUpdate =
      updateData?.name !== menuCategory?.name ||
      updateData?.isAvailable !== menuCategory?.isAvailable;
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
      <Layout_Back>
        <Typography>Menu category not found</Typography>
      </Layout_Back>
    );
  }

  return (
    <Layout_Back>
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
            className="text-white-text"
            label="Available"
          />
          <Button
            className="create-b "
            sx={{ mt: 4, width: "fit-content" }}
            onClick={handleUpdate}
          >
            Update
          </Button>
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
    </Layout_Back>
  );
};

export default MenuCategoryDetail;

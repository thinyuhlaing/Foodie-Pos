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
import { motion } from "framer-motion";
const MenuCategoryDetail = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<UpdateMenuPayload>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number[]>([]);

  const menuId = Number(router.query.id); //router:query {id: '1'}
  const { menus } = useAppSelector((state) => state.menu);
  const menu = menus.find((item) => item.id === menuId);
  const { menuCategoryMenus } = useAppSelector(
    (state) => state.menuCategoryMenu
  );
  const { menuCategories } = useAppSelector((state) => state.menuCategory);
  const selectedLocation = useAppSelector(
    (state) => state.app.selectedLocation
  );

  const selectedMenuCategoryIds = menuCategoryMenus
    .filter((item) => item.menuId === menuId)
    .map((item) => {
      const menuCategory = menuCategories.find(
        (menuCategory) => menuCategory.id === item.menuCategoryId
      ) as MenuCategory;
      return menuCategory.id;
    });

  const { disabledLocationMenus } = useAppSelector(
    (state) => state.disabledLocationMenu
  );
  const isAvailable = disabledLocationMenus.find(
    (item) => item.locationId === selectedLocation?.id && item.menuId === menuId
  )
    ? false
    : true;
  useEffect(() => {
    if (menu) {
      setUpdateData(menu);
      setSelected(selectedMenuCategoryIds);
    }
  }, [menu]);

  useEffect(() => {
    if (updateData) {
      setUpdateData({
        ...updateData,
        locationId: selectedLocation?.id,
        isAvailable,
        menuCategoryIds: selected,
      });
    }
  }, [selected]);

  console.log("menu:", updateData);

  const handleUpdate = () => {
    // const shouldUpdate =
    //   updateData?.name !== menu?.name || updateData?.price !== menu?.price;
    // if (!shouldUpdate) {
    //   return router.push("/backoffice/menu");
    // }
    updateData &&
      dispatch(
        updateMenu({
          ...updateData,
          onSuccess: () => {
            dispatch(
              showSnackbar({
                type: "success",
                message: "Updated menu created successfully",
              })
            );
            router.push("/backoffice/menu");
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
        <Box className="flex flex-col w-80  justify-between h-[22rem]  ">
          <TextField
            value={updateData.name}
            onChange={(evt) =>
              setUpdateData({ ...updateData, name: evt.target.value })
            }
          />
          <TextField
            value={updateData.price}
            onChange={(evt) =>
              setUpdateData({ ...updateData, price: Number(evt.target.value) })
            }
          />

          <MultiSelect
            title="Menu Category"
            selected={selected}
            setSelected={setSelected}
            items={menuCategories}
          />

          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={isAvailable}
                onChange={(evt, value) =>
                  setUpdateData({ ...updateData, isAvailable: value })
                }
              />
            }
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
        title="Delete Menu"
        content="are you sure you want to delete this menu?"
        open={open}
        setOpen={setOpen}
        handleDelete={() => {
          dispatch(deleteMenu({ id: menuId }));
          setOpen(false);
          router.push("/backoffice/menu");
        }}
      />
    </>
  );
};

export default MenuCategoryDetail;

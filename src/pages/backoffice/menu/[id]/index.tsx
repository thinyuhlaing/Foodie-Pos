import DeleteDialog from "@/components/DeleteDialog";
import Layout_Back from "@/components/Layout_Back";
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
const MenuCategoryDetail = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [updateData, setUpdateData] = useState<UpdateMenuPayload>();
  const router = useRouter();
  const dispatch = useAppDispatch();

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
  }, [selected, disabledLocationMenus]);

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
      <Layout_Back>
        <Typography>Menu category not found</Typography>
      </Layout_Back>
    );
  }

  return (
    <Layout_Back>
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

          <FormControl sx={{ width: "100%" }}>
            <InputLabel>Menu Category</InputLabel>
            <Select
              value={selected}
              multiple
              input={<OutlinedInput label="Menu Category" />}
              onChange={(evt) => {
                const selected = evt.target.value as number[];
                setSelected(selected);
              }}
              renderValue={() => {
                return selected
                  .map(
                    (itemId) =>
                      menuCategories.find(
                        (menuCategory) => menuCategory.id === itemId
                      ) as MenuCategory
                  )
                  .map((item) => item.name)
                  .join(", ");
              }}
            >
              {menuCategories.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    <Checkbox />
                    <ListItemText>{item.name}</ListItemText>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
    </Layout_Back>
  );
};

export default MenuCategoryDetail;

import DeleteDialog from "@/components/DeleteDialog";
import Layout_Back from "@/components/Layout_Back";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showSnackbar } from "@/store/slices/appSnackbarSlice";
import { updateMenuCategory } from "@/store/slices/menuCategorySlice";
import { deleteMenu } from "@/store/slices/menuSlice";
import { UpdateMenuPayload } from "@/types/menu";
//import { updateMenuCategory } from "@/store/slices/menuCategorySlice";
import { UpdateMenuCategoryPayload } from "@/types/menuCategory";
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

const MenuCategoryDetail = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [updateData, setUpdateData] = useState<UpdateMenuPayload>();
  const router = useRouter();
  const menuId = Number(router.query.id); //router:query {id: '1'}
  const { menus } = useAppSelector((state) => state.menu);
  const menu = menus.find((item) => item.id === menuId);
  const dispatch = useAppDispatch();
  const { menuCategories } = useAppSelector((state) => state.menuCategory);
  useEffect(() => {
    if (menu) {
      setUpdateData(menu);
    }
  }, []);

  // const handleUpdate = () => {
  //   const shouldUpdate =
  //     updateData?.name !== menu?.name || updateData?.price !== menu?.price;
  //   if (!shouldUpdate) {
  //     return router.push("/backoffice/menu-category");
  //   }
  //   updateData &&
  //     dispatch(
  //       updateMenuCategory({
  //         ...updateData,
  //         onSuccess: () => {
  //           dispatch(
  //             showSnackbar({
  //               type: "success",
  //               message: "Updated menu category created successfully",
  //             })
  //           );
  //           router.push("/backoffice/menu-category");
  //         },
  //       })
  //     );
  // };

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
        <Box className="flex flex-col w-80  justify-between h-72 ">
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
            <Select input={<OutlinedInput label="Menu Category" />}>
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
          <Button
            className="create-b "
            sx={{ mt: 4, width: "fit-content" }}
            //onClick={handleUpdate}
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

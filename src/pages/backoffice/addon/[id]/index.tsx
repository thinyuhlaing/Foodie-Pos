import DeleteDialog from "@/components/DeleteDialog";
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
import { UpdateAddonCategoryPayload } from "@/types/addonCategory";
import {
  deleteAddonCategory,
  updateAddonCategory,
} from "@/store/slices/addonCategorySlice";
import { UpdateAddonPayload } from "@/types/addon";
import SingleSelect from "@/components/SingleSelect";
import { deleteAddon, updateAddon } from "@/store/slices/addonSlice";
const AddonCategoryDetail = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<UpdateAddonPayload>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number>();
  const addonId = Number(router.query.id); //router:query {id: '1'}
  const { addons } = useAppSelector((state) => state.addon);
  const addon = addons.find((item) => item.id === addonId);
  const { addonCategories } = useAppSelector((state) => state.addonCategory);
  useEffect(() => {
    if (addon) {
      setUpdateData({ ...addon });
      setSelected(addon.addonCategoryId);
    }
  }, [addon]);

  useEffect(() => {
    if (updateData && selected) {
      setUpdateData({
        ...updateData,
        addonCategoryId: selected,
      });
    }
  }, [selected]);

  if (!updateData) {
    return (
      <>
        <Typography>Addon not found</Typography>
      </>
    );
  }
  const handleUpdate = () => {
    // const shouldUpdate =
    //   updateData?.name !== menu?.name || updateData?.price !== menu?.price;
    // if (!shouldUpdate) {
    //   return router.push("/backoffice/menu");
    // }
    updateData &&
      dispatch(
        updateAddon({
          ...updateData,
          onSuccess: () => {
            dispatch(
              showSnackbar({
                type: "success",
                message: "Updated addon  successfully",
              })
            );
            router.push("/backoffice/addon");
          },
          onError: () => {
            dispatch(
              showSnackbar({
                type: "error",
                message: "Error occurred when updating addon",
              })
            );
          },
        })
      );
  };

  console.log("addonCategories", addonCategories);

  return (
    <>
      <Box className=" flex justify-between">
        <Box className="flex flex-col w-80  justify-between h-[15rem] ">
          <TextField
            value={updateData.name}
            onChange={(evt) =>
              setUpdateData({ ...updateData, name: evt.target.value })
            }
          />
          <SingleSelect
            title="Addon Category"
            selected={selected}
            setSelected={setSelected}
            items={addonCategories}
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
          dispatch(deleteAddon({ id: addonId }));
          setOpen(false);
          router.push("/backoffice/addon");
          console.log("addonId", addonId);
        }}
      />
    </>
  );
};

export default AddonCategoryDetail;

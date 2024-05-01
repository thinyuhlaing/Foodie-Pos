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
const AddonCategoryDetail = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<UpdateAddonCategoryPayload>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number[]>([]);
  const addonCatgoryId = Number(router.query.id); //router:query {id: '1'}
  const { addonCategories } = useAppSelector((state) => state.addonCategory);

  const { menuAddonCategories } = useAppSelector(
    (state) => state.menuAddonCategory
  );

  const selectedMenuIds = menuAddonCategories
    .filter((item) => item.addonCategoryId === addonCatgoryId)
    .map((item) => {
      const menuId = item.menuId;
      return menuId;
    });
  const { company } = useAppSelector((state) => state.company);
  const addonCatgory = addonCategories.find(
    (item) => item.id === addonCatgoryId
  );
  const { menus } = useAppSelector((state) => state.menu);
  console.log(selectedMenuIds);
  // const { disabledLocationMenus } = useAppSelector(
  //   (state) => state.disabledLocationMenu
  // );
  // const isAvailable = disabledLocationMenus.find(
  //   (item) => item.locationId === selectedLocation?.id && item.menuId === menuId
  // )
  //   ? false
  //   : true;
  useEffect(() => {
    if (addonCatgory) {
      setUpdateData({
        ...addonCatgory,
        menuIds: selectedMenuIds,
        companyId: company?.id,
      });
      setSelected(selectedMenuIds);
    }
  }, [addonCatgory]);

  useEffect(() => {
    if (updateData) {
      setUpdateData({
        ...updateData,
        menuIds: selected,
        companyId: company?.id,
      });
    }
  }, [selected]);
  if (!updateData) {
    return (
      <>
        <Typography>Addon category not found</Typography>
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
        updateAddonCategory({
          ...updateData,
          onSuccess: () => {
            dispatch(
              showSnackbar({
                type: "success",
                message: "Updated addon category successfully",
              })
            );
            router.push("/backoffice/addon-category");
          },
        })
      );
  };

  console.log("updateDataAddonCate :", updateData);

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
          <MultiSelect
            title="Menu"
            selected={selected}
            setSelected={setSelected}
            items={menus}
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
          dispatch(deleteAddonCategory({ id: addonCatgoryId }));
          setOpen(false);
          router.push("/backoffice/addon-category");
        }}
      />
    </>
  );
};

export default AddonCategoryDetail;

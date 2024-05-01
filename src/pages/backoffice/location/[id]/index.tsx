import DeleteDialog, { createVariants } from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedLocation } from "@/store/slices/appSlice";
import { showSnackbar } from "@/store/slices/appSnackbarSlice";
import { updateLocation } from "@/store/slices/locationSlice";
import { UpdateLocationPayload } from "@/types/location";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function locationDetail() {
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState<UpdateLocationPayload>();
  const router = useRouter();
  const { selectedLocation } = useAppSelector((state) => state.app);
  const locationId = Number(router.query.id);
  const { locations } = useAppSelector((state) => state.location); // calling location data
  const location = locations.find((item) => item.id === locationId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (location) {
      setUpdateData(location);
    }
  }, [location]);
  // in array, need to put location because in line 21, we're calling location data and haven't reach yet.
  // but when you use location in  setUpdataData you won't see it. that's why we set location in array

  if (!updateData) {
    return (
      <>
        <Typography>Location not found</Typography>
      </>
    );
  }

  const handleUpdate = () => {
    dispatch(
      updateLocation({
        ...updateData,
        onSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "Updated location successfully",
            })
          );
          router.push("/backoffice/location");
        },
      })
    );
  };

  return (
    <>
      <Box className=" flex justify-between">
        <Box className="flex flex-col w-80  justify-between h-48 text-white-text">
          <TextField
            value={updateData.name}
            onChange={(evt) =>
              setUpdateData({ ...updateData, name: evt.target.value })
            }
          />
          <FormControlLabel
            control={
              <Switch
                checked={selectedLocation?.id === locationId}
                onChange={() => {
                  if (location) {
                    localStorage.setItem(
                      "selectedLocationId",
                      String(location.id)
                    );
                    dispatch(setSelectedLocation(location));
                  }
                }}
              />
            }
            label="Current location"
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
        title="Delete Location"
        content="are you sure you want to delete this location?"
        open={open}
        setOpen={setOpen}
        // handleDelete={() => {
        //   dispatch(deleteMenuCategory({ id: menuCategoryId }));
        //   setOpen(false);
        //   router.push("/backoffice/menu-category");
        // }}
      />
    </>
  );
}

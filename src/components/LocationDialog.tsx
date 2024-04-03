import { useAppDispatch } from "@/store/hooks";
import { showSnackbar } from "@/store/slices/appSnackbarSlice";
import { createLocation } from "@/store/slices/locationSlice";
import { CreateLocationPayload } from "@/types/location";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  location: CreateLocationPayload;
  setLocation: Dispatch<SetStateAction<CreateLocationPayload>>;
}

export default function LocationDialog({
  open,
  setOpen,
  location,
  setLocation,
}: Props) {
  const dispatch = useAppDispatch();
  const handleCreateMenu = () => {
    const isValid =
      location.name && location.street && location.township && location.city;
    if (!isValid) return alert("Missing required data");
    dispatch(
      createLocation({
        ...location,
        onSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "Location created successfully",
            })
          );

          setOpen(false);
        },
        onError: () => {
          dispatch(
            showSnackbar({
              type: "error",
              message: "Error occured when creating location",
            })
          );
        },
      })
    );
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box className="bg-[#FBF6EE]">
        <DialogTitle>New Location</DialogTitle>
        <DialogContent className="w-80">
          <Box>
            <TextField
              placeholder="Name"
              sx={{ width: "100%", mb: 2 }}
              onChange={(evt) =>
                setLocation({ ...location, name: evt.target.value })
              }
            />
            <TextField
              placeholder="Street"
              sx={{ width: "100%", mb: 2 }}
              onChange={(evt) =>
                setLocation({ ...location, street: evt.target.value })
              }
            />
            <TextField
              placeholder="Township"
              sx={{ width: "100%", mb: 2 }}
              onChange={(evt) =>
                setLocation({ ...location, township: evt.target.value })
              }
            />
            <TextField
              placeholder="City"
              sx={{ width: "100%", mb: 2 }}
              onChange={(evt) =>
                setLocation({ ...location, city: evt.target.value })
              }
            />
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

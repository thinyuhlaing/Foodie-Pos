import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { CreateMenuPayload } from "@/types/menu";
import { useAppDispatch } from "@/store/hooks";
import { showSnackbar } from "@/store/slices/appSnackbarSlice";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newMenu: CreateMenuPayload;
  setNewMenu: React.Dispatch<React.SetStateAction<CreateMenuPayload>>;
}
export default function MenuDialog({
  open,
  setOpen,
  newMenu,
  setNewMenu,
}: Props) {
  const dispatch = useAppDispatch();

  const handleCreateMenu = () => {
    dispatch(
      showSnackbar({
        type: "error",
        message: "Error occurred when creating menu",
      })
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box className="bg-[#FBF6EE]">
        <DialogTitle>New Menu</DialogTitle>
        <DialogContent sx={{ width: 300 }}>
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
              sx={{ width: "100%" }}
              onChange={(evt) =>
                setNewMenu({ ...newMenu, price: Number(evt.target.value) })
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

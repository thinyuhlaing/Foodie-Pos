import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { buttonVariants } from "./TopBar";

interface Props {
  title: string;
  content: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete?: () => void;
}

export const cancleVariants = {
  start: {
    y: 0,
  },
  hover: {
    y: -3,
    boxShadow: "0px 0px 10px rgb(240, 166, 38)", // 0 --> left/right  || 10 --> up/down || 0 --> like opacity
  },
};

export const deleteVariants = {
  start: {
    y: 0,
  },
  hover: {
    y: -3,
    boxShadow: "0px 0px 10px rgb(228, 40, 40)", // 0 --> left/right  || 10 --> up/down || 0 --> like opacity
  },
};

export const createVariants = {
  start: {
    y: 0,
  },
  hover: {
    y: -3,
    textShadow: "0px 0px 8px rgb(74, 122, 54)",
    boxShadow: "0px 0px 10px rgb(114, 164, 93)",
  },
};

const DeleteDialog = ({
  title,
  content,
  open,
  setOpen,
  handleDelete,
}: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className="w-80">{content}</DialogContent>
      <DialogActions>
        <motion.button
          className="cancle-b"
          variants={cancleVariants}
          initial="start"
          whileHover="hover"
          onClick={() => setOpen(false)}
        >
          Cancel
        </motion.button>
        <motion.button
          variants={deleteVariants}
          initial="start"
          whileHover="hover"
          className="delete-b"
          onClick={handleDelete}
        >
          Delete
        </motion.button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;

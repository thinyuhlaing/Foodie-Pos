import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export const buttonVariants = {
  start: {
    y: 0,
  },
  hover: {
    y: -3,
    textShadow: "0px 0px 8px rgb(74, 122, 54)",
    boxShadow: "0px 0px 10px rgb(74, 122, 54)", // 0 --> left/right  || 10 --> up/down || 0 --> like opacity
  },
};

const animation = {
  start: {
    opacity: 0,
    pathLength: 0,
  },
  end: {
    opacity: 1,
    pathLength: 1,
    transition: { duration: 1 },
  },
};

export default function TopBar() {
  const { selectedLocation } = useAppSelector((state) => state.app);
  const { data } = useSession();

  return (
    <Box className="top-bar">
      <Box className="logo-name">
        <motion.img
          className="logo"
          src="https://freedesignfile.com/upload/2019/06/Fresh-food-logo-creative-design-vectors-02.jpg"
          drag /* it makes elements dragable */
          dragConstraints={{
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }}
          dragElastic={0.1}
        />
        <motion.div
          className="name"
          variants={animation}
          initial="start"
          animate="end"
        >
          Foodie Pos
        </motion.div>
      </Box>
      <Typography variant="h6" className="w-fit">
        {selectedLocation?.name}
      </Typography>
      <Link href="../auth/signIn">
        <motion.button
          onClick={() => (data ? signOut() : signIn())}
          className="sign-in-out"
          variants={buttonVariants}
          initial="start"
          whileHover="hover"
        >
          {data ? "" : <AccountCircleIcon />}
          <Box> {data ? "Sign Out" : "Sign In"}</Box>
        </motion.button>
      </Link>
    </Box>
  );
}

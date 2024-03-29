import Layout_Back from "@/components/Layout_Back";
import MenuDialog from "@/components/MenuDialog";
import { buttonVariants } from "@/components/TopBar";
import { CreateMenuPayload } from "@/types/menu";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Menu() {
  const [open, setOpen] = useState(false);
  const [newMenu, setNewMenu] = useState<CreateMenuPayload>({
    name: "",
    price: 0,
  });

  return (
    <Layout_Back>
      <motion.button
        className="button"
        variants={buttonVariants}
        initial="start"
        whileHover="hover"
        onClick={() => setOpen(true)}
      >
        Menu
      </motion.button>
      <MenuDialog
        open={open}
        setOpen={setOpen}
        newMenu={newMenu}
        setNewMenu={setNewMenu}
      />
    </Layout_Back>
  );
}

export default Menu;

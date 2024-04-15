import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Finished from "@mui/icons-material/Check";
import { ReactNode, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { text } from "stream/consumers";
import { wrap } from "module";
import { useAppSelector } from "../store/hooks";
import { useRouter } from "next/router";

export interface ListBoxProps {
  label: string;
  icon: ReactNode;
  route: string;
}

const ListBox = ({ label, icon, route }: ListBoxProps) => {
  const [isClicked, setIsClicked] = useState("side-bar-items");
  const selected = localStorage.getItem("selectedSideBarItem");

  useEffect(() => {
    if (selected === route) {
      setIsClicked("side-bar-items-click");
    } else {
      setIsClicked("side-bar-items");
    }
  }, []);

  const handleClick = () => {
    if (isClicked === "side-bar-items") {
      setIsClicked("side-bar-items-click");
      localStorage.setItem("selectedSideBarItem", route);
    } else {
      setIsClicked("side-bar-items");
    }
  };
  return (
    <ListItem disablePadding>
      <ListItemButton className={isClicked} onClick={handleClick}>
        <ListItemIcon className="list-icon">{icon}</ListItemIcon>
        <ListItemText primary={label} className="list-text" />
      </ListItemButton>
    </ListItem>
  );
};

export default ListBox;

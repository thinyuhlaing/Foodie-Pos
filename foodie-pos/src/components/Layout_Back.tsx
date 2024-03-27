import { Box } from "@mui/material";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function Layout_Back({ children }: Props) {
  return (
    <Box className="layout">
      <TopBar />
      <Box className="side-container">
        <SideBar />
        <Box className="container">{children}</Box>
      </Box>
    </Box>
  );
}

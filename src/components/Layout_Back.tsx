import { Box } from "@mui/material";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import AppSnackbar from "./AppSnackbar";

interface Props {
  children?: ReactNode;
}

export default function Layout_Back({ children }: Props) {
  const { data } = useSession();
  return (
    <Box className="layout">
      <TopBar />
      <Box className="side-container">
        {data && <SideBar />}
        <Box className="container">
          {/* {data ? "" : ""} */}
          {children}
        </Box>
        <AppSnackbar />
      </Box>
    </Box>
  );
}

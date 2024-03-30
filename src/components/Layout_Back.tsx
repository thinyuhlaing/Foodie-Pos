import { Box } from "@mui/material";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import AppSnackbar from "./AppSnackbar";
import { fetchAppData } from "@/store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface Props {
  children?: ReactNode;
}

export default function Layout_Back({ children }: Props) {
  const { init } = useAppSelector((state) => state.app);
  const { data } = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!init) {
      dispatch(fetchAppData());
    }
  }, []);
  console.log(init);
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

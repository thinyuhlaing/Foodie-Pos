import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import TopBar from "./TopBar";
import AppSnackbar from "./AppSnackbar";
import { useRouter } from "next/router";
import { fetchAppData } from "@/store/slices/appSlice";
import { useAppDispatch } from "@/store/hooks";
import OrderAppHeader from "./OrderAppHeader";

interface Props {
  children?: ReactNode;
}

export default function Layout_Order({ children }: Props) {
  const router = useRouter();
  const { tableId }: any = router.query;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (tableId) {
      dispatch(fetchAppData({ tableId: Number(tableId) }));
      // get menu categories
    }
  }, [tableId]);
  return (
    <Box className="order-layout">
      <OrderAppHeader />
      <Box className="order-body">{children}</Box>
      {/* <OrderAppFooter /> */}

      <AppSnackbar />
    </Box>
  );
}
// className="order-body"

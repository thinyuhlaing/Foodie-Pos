import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Layout_Back from "./Layout_Back";
import Layout_Order from "./Layout_Order";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter(); // router --> localhost:3000/backoffice?tableId=8
  const { tableId } = router.query; // query --> localhost:3000/backoffice?tableId=8  --> tableId=8
  const pathname = router.pathname; // pathname --> localhost:3000/backoffice  --> backoffice
  const isBackofficeApp = pathname.includes("backoffice");
  const isOrderApp = tableId;
  if (isBackofficeApp) {
    console.log("isBackofficeApp");
    return <Layout_Back>{children}</Layout_Back>;
  }
  if (isOrderApp) {
    return <Layout_Order>{children}</Layout_Order>;
  }
  return <Box> {children} </Box>;
}

import { useAppSelector } from "@/store/hooks";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import EggIcon from "@mui/icons-material/Egg";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import TableBarIcon from "@mui/icons-material/TableBar";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import ListBox from "./ListBox";

const sidebarItems = [
  {
    id: 1,
    label: "Orders",
    icon: <LocalMallIcon />,
    route: "/backoffice/order",
  },
  {
    id: 2,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/backoffice/menu-category",
  },
  {
    id: 3,
    label: "Menus",
    icon: <LocalDiningIcon />,
    route: "/backoffice/menu",
  },
  {
    id: 4,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/backoffice/addon-category",
  },
  {
    id: 5,
    label: "Addons",
    icon: <EggIcon />,
    route: "/backoffice/addon",
  },
  {
    id: 6,
    label: "Tables",
    icon: <TableBarIcon />,
    route: "/backoffice/table",
  },
  {
    id: 7,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/backoffice/location",
  },
];

export default function SideBar() {
  //const { theme } = useAppSelector((state) => state.app);
  return (
    <Box className="side-bar">
      <List>
        {sidebarItems.map((item) => (
          <Link
            key={item.id}
            href={item.route}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <ListBox icon={item.icon} label={item.label} route={item.route} />
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <Link href={"/backoffice/setting"} style={{ textDecoration: "none" }}>
          <ListBox
            icon={<SettingsIcon />}
            label="Settings"
            route="/backoffice/setting"
          />
        </Link>
      </List>
    </Box>
  );
}

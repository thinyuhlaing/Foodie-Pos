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
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function SideBar() {
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
  return (
    <Box>
      <Box className="side-bar ">
        <List>
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              href={item.route}
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <ListItem disablePadding className="side-bar-items">
                <ListItemButton>
                  <ListItemIcon className="list-icon">{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} className="list-text" />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <Link href={"/backoffice/setting"} style={{ textDecoration: "none" }}>
            <ListItem disablePadding className="side-bar-items">
              <ListItemButton>
                <ListItemIcon className="list-icon">
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={"Settings"} className="list-text" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Box>
    </Box>
  );
}

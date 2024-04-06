import ItemCard from "@/components/ItemCard";
import Layout_Back from "@/components/Layout_Back";
import LocationDialog from "@/components/LocationDialog";
import { buttonVariants } from "@/components/TopBar";
import { useAppSelector } from "@/store/hooks";
import { CreateLocationPayload } from "@/types/location";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";

function Location() {
  const companyId = useAppSelector((state) => state.company.company?.id);
  const { locations } = useAppSelector((state) => state.location);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<CreateLocationPayload>({
    name: "",
    street: "",
    township: "",
    city: "",
    companyId: companyId,
  });
  console.log("locations :", locations);
  return (
    <Layout_Back>
      <motion.button
        className="button"
        variants={buttonVariants}
        initial="start"
        whileHover="hover"
        onClick={() => setOpen(true)}
      >
        Location
      </motion.button>
      <Box className="flex flex-wrap ">
        {locations.map((item) => {
          return (
            <ItemCard
              key={item.id}
              icon={<CategoryIcon />}
              title={item.name}
              href={`/backoffice/location/${item.id}`}
              location={true}
            />
          );
        })}
      </Box>

      <LocationDialog
        open={open}
        setOpen={setOpen}
        location={location}
        setLocation={setLocation}
      ></LocationDialog>
    </Layout_Back>
  );
}

export default Location;

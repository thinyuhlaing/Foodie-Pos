import { createVariants } from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appDataSelector } from "@/store/slices/appSlice";
import { showSnackbar } from "@/store/slices/appSnackbarSlice";
import { updateCompany } from "@/store/slices/companySlice";
import { UpdateCompanyPayload } from "@/types/company";
import { Box, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";

function Settings() {
  const { company } = useAppSelector(appDataSelector, shallowEqual);
  const [updateData, setUpdateData] = useState<UpdateCompanyPayload>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!company) return;
    setUpdateData(company);
  }, []);
  console.log("updateData", updateData);
  if (!updateData) return;
  const handleUpdate = () => {
    updateData &&
      dispatch(
        updateCompany({
          ...updateData,
          onSuccess: () => {
            dispatch(
              showSnackbar({
                type: "success",
                message: "Updated company successfully",
              })
            );
          },
        })
      );
  };

  return (
    <Box className=" flex justify-between">
      <Box className="flex flex-col w-80  justify-between h-[26rem]  ">
        <TextField
          value={updateData.name}
          label="name"
          onChange={(evt) =>
            setUpdateData({ ...updateData, name: evt.target.value })
          }
        />
        <TextField
          value={updateData.street}
          label="street"
          onChange={(evt) =>
            setUpdateData({ ...updateData, street: evt.target.value })
          }
        />

        <TextField
          value={updateData.township}
          label="township"
          onChange={(evt) =>
            setUpdateData({ ...updateData, township: evt.target.value })
          }
        />
        <TextField
          value={updateData.city}
          label="city"
          onChange={(evt) =>
            setUpdateData({ ...updateData, city: evt.target.value })
          }
        />
        <motion.button
          className="create-b mt-5"
          variants={createVariants}
          initial="start"
          whileHover="hover"
          onClick={handleUpdate}
        >
          Update
        </motion.button>
      </Box>
    </Box>
  );
}

export default Settings;

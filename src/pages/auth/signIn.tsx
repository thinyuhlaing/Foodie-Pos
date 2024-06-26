import { Divider } from "@mui/joy";
import { Box, Button, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <>
      <Box className=" px-10 py-[5rem] bg-light-bg w-1/4 h-4/6 flex flex-col justify-between items-center mx-auto mt-6 rounded-xl">
        <Typography variant="h4" className="text-light-text">
          Login
        </Typography>
        <Box>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            className="mb-6 w-full"
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className=" w-full"
          />
        </Box>
        <button className=" bg-light-createB w-full text-black  bg-light text-center rounded-2xl p-3">
          Login
        </button>
        <Divider> or </Divider>

        <button
          className="w-full h-12 text-black  bg-light  rounded-2xl p-2 bg-[#DEEBCC] justify-center flex items-center"
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          <img
            className="w-8 h-full inline-block rounded-full mr-3"
            src="https://yt3.googleusercontent.com/vY3uYs71A_JwVcigyd2tVRHwuj05_cYktQSuzRCxta-9VFxHFtKjGrwG9WFi8ijXITBL3CwPQQ=s900-c-k-c0x00ffffff-no-rj"
          ></img>
          Sign up with Google
        </button>
      </Box>
    </>
  );
}

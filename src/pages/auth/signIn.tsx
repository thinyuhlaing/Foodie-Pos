import Layout_Back from "@/components/Layout_Back";
import { Box, Button, TextField } from "@mui/material";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <Layout_Back>
      <Box className="w-full h-screen flex justify-center items-center ">
        <Button
          className="w-48 text-black  bg-white text-center rounded-2xl p-3 "
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          Sign in with Google
        </Button>
      </Box>
    </Layout_Back>
  );
}

import Layout_Back from "@/components/Layout_Back";
import { useDispatch } from "react-redux";
import SignIn from "../auth/signIn";
import { useSession } from "next-auth/react";
import Order from "./order";

export default function backOff() {
  const { data } = useSession();
  return <>{data ? <Order /> : <SignIn />}</>;
}

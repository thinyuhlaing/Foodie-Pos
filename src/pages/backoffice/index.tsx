import { useDispatch } from "react-redux";
import SignIn from "../auth/signIn";
import { useSession } from "next-auth/react";
import Order from "./order";

export default function BackOff() {
  // const { data } = useSession();
  // return <>{data ? <Order /> : <SignIn />}</>;

  <Order/>
}

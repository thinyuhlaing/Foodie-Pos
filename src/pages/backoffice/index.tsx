import Layout_Back from "@/components/Layout_Back";
import { useDispatch } from "react-redux";

export default function backOff() {
  const dispatch = useDispatch();

  return (
    <>
      <Layout_Back>
        <h1>BackOffice</h1>
      </Layout_Back>
    </>
  );
}

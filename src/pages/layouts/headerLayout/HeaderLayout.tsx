import { Outlet } from "react-router-dom";
import { Header } from "widgets";

export default function HeaderLayout() {
  return <>
    <Header />
    <Outlet />
  </>
}
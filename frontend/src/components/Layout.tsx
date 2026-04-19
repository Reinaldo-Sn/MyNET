import { ReactNode } from "react";
import Navbar from "./Navbar/main";

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Navbar />
    {children}
  </>
);

export default Layout

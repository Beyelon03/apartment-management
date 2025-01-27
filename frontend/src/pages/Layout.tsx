import { Outlet } from "react-router";
import Header from "../components/Header.tsx";
import "../styles/layout.css";

const Layout = () => {
  return (
    <div>
      <Header />
      <main style={{ marginTop: "60px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

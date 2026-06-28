import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

function Layout() {
  return (
    <div className="appShell">
      <Navbar />

      <main className="mainContent">
        <Outlet />
      </main>

      <footer className="footer">
        <p>StreamList, created for EZTechMovie IT Department</p>
      </footer>
    </div>
  );
}

export default Layout;

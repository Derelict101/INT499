import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import PwaInstallButton from "./PwaInstallButton.jsx";

function Layout() {
  return (
    <div className="appShell">
      <Navbar />

      <main className="mainContent">
        <Outlet />
        <PwaInstallButton />
      </main>

      <footer className="footer">
        <p>StreamList, created for EZTechMovie IT Department</p>
      </footer>
    </div>
  );
}

export default Layout;

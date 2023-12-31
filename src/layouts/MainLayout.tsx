import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="pt-8 px-4 mb-24">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

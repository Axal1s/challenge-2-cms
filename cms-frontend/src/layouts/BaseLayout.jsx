import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
export default function BaseLayout() {
  return (
    <section className="container-fluid" id="home-section">
      <div className="row">
        <Navbar />
        <Sidebar />
        <Outlet />
      </div>
    </section>
  );
}

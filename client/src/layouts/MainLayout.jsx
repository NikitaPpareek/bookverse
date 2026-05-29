import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg transition-colors duration-300 flex flex-col">
      <Navbar />
      <main className="pt-[60px] sm:pt-[64px] flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

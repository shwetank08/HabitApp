import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Sidebar />

      <div className="md:ml-64 min-h-screen bg-stone-100 px-4 flex flex-col">
        
        {/* Navbar now part of flow */}
        <div className="p-4">
          <Navbar />
        </div>

        {/* Content naturally below */}
        <main className="p-6 max-w-7xl mx-auto w-full flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;

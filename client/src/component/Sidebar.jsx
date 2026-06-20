import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // 1. Import NavLink
import {
  Menu,
  X,
  LayoutDashboard,
  PlusCircle,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/" },
    { name: "Add Habit", icon: <PlusCircle size={18} />, path: "/habit/add" },
    { name: "Analytics", icon: <BarChart2 size={18} />, path: "/habit/analytics" },
    { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-900 text-white">
        <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          HabitTracker
        </h2>
        <button onClick={() => setIsOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800 z-50 text-white p-6 overflow-y-auto transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            HabitTracker
          </h2>

          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        {/* Menu */}
        <ul className="space-y-3">
          {menuItems.map((item, index) => {
            return (
              <li key={index}>
                {/* 3. Replaced <a> with <NavLink> */}
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)} // Closes mobile drawer on link click
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-4 rounded-xl transition-all ${
                      isActive
                        ? "bg-indigo-500/20 text-indigo-400"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white hover:translate-x-1"
                    }`
                  }
                >
                  {/* The icon color adjusts based on the parent link state naturally via Tailwind text utilities */}
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        
        <div className="mt-10 md:hidden">
          <button className="w-full flex items-center gap-3 py-2 px-4 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
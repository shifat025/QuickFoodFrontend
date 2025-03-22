import {
  LogOut,
  Menu,
  Moon,
  Settings,
  ShoppingBag,
  Sun,
  TrendingUp,
  User
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function DashboardLayout({ children }) {
const location = useLocation();
const [isDarkMode, setIsDarkMode] = useState(false);

const menuItems = [
  { path: '/restaurant/dashboard', icon: TrendingUp, label: 'Dashboard' },
  { path: '/restaurant/menu', icon: Menu, label: 'Menu Management' },
  { path: '/restaurant/orders', icon: ShoppingBag, label: 'Orders' },
  { path: '/restaurant/settings', icon: Settings, label: 'Settings' },
];

return (
  <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Restaurant Name</h2>
        <p className="text-sm text-gray-600">Restaurant Dashboard</p>
      </div>
      
      <nav className="mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 ${
                isActive ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
        
        <div className="mt-auto border-t pt-4">
          <Link
            to="/logout"
            className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Link>
        </div>
      </nav>
    </div>

    {/* Main Content with Navbar */}
    <div className="flex-1 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <div className="flex justify-end items-center px-8 py-4">
          <div className="flex items-center space-x-4">
            {/* Theme Switcher */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-600" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 pt-4 bg-gray-50">
        {children}
      </main>
    </div>
  </div>
);
}

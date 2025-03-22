import Cookies from "js-cookie";
import { ShoppingBag, User } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import RestaurantForm from "../Form/RestuarantForm";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { auth } = useAuth(); // Assuming useAuth hook provides logout functionality
  const roles = auth?.user?.role;

  const navigate = useNavigate(); // To redirect after logout

  const handleLogout = () => {
    Cookies.remove("authToken", { secure: true, sameSite: "Strict" });
    Cookies.remove("refreshToken", { secure: true, sameSite: "Strict" });
    Cookies.remove("user", { secure: true, sameSite: "Strict" });

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <ShoppingBag
                  className="h-8 w-8 text-blue-600"
                  aria-label="Logo"
                />
              </Link>
              <nav className="hidden md:block ml-4">
                <ul className="flex items-baseline space-x-4">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Restaurants
                    </Link>
                  </li>
                  {roles === "owner" && (
                    <li>
                      <Link
                        to="/ordered/item"
                        className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Orders
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
            {/* Cart and Profile */}
            <div className="flex items-center space-x-4">
              {/* Sign-in/Sign-up Links if not authenticated */}
              {!auth?.user ? (
                <>
                  <Link
                    to="/login"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center text-sm text-gray-700 hover:text-gray-900"
                  >
                    <User className="h-6 w-6" aria-label="User Profile" />
                    <span className="ml-2 hidden md:inline">Account</span>
                  </Link>
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal */}
      {isModalOpen && <RestaurantForm setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

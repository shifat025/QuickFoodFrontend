import { ShoppingBag, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import RestaurantForm from "../Form/RestuarantForm";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { auth } = useAuth();
  const roles = auth?.user?.role;

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
              {/* <Link
                to="/cart"
                className="relative p-1 rounded-full text-gray-500 hover:text-gray-700"
              >
                <ShoppingBag className="h-6 w-6" aria-label="Shopping Cart" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white">
                  2
                </span>
              </Link> */}
              <Link
                to="/profile"
                className="flex items-center text-sm text-gray-700 hover:text-gray-900"
              >
                <User className="h-6 w-6" aria-label="User Profile" />
                <span className="ml-2 hidden md:inline">Account</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Modal */}
      {isModalOpen && <RestaurantForm setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

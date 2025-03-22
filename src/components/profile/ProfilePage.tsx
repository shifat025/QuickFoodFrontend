import {
  ChevronRight,
  Clock,
  MapPin,
  PlusCircle,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Header from "../common/Header";
import RestaurantForm from "../Form/RestuarantForm";
import { Link } from "react-router-dom";
import useRestaurantApi from "../../features/Restuarant/restaurantApi";
import OrderHistory from "./OrderHistory";
import RestaurantProfileCard from "./RestuarantProfileCard";

export function ProfilePage() {
  const { auth } = useAuth();
  const role = auth?.user?.role;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRestaurant, setEditRestaurant] = useState(null);
  const [restaurantList, setRestaurantList] = useState([]);
  const { getRestaurant, deleteRestaurant, loading, error } = useRestaurantApi();

  // Fetch restaurant data
  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getRestaurant();
      if (data) {
        setRestaurantList(data);
      }
    };
    fetchRestaurants();
  }, []);

  const handleEdit = (restaurant) => {
    setEditRestaurant(restaurant); // Set the restaurant to be edited
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setEditRestaurant(null); // Reset when closing the modal
    setIsModalOpen(false); // Close the modal
  };

  // Delete a restaurant
  const handleDelete = async (id) => {
    const deletedId = await deleteRestaurant(id);
    if (deletedId) {
      setRestaurantList(
        restaurantList.filter((restaurant) => restaurant.id !== deletedId)
      );
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader text"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-red-500 bg-red-100 p-4 rounded-lg shadow-md">
        <p className="font-semibold">Error loading data!</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto">
        {/* Profile Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">
                {auth?.user?.name || "John Doe"}
              </h2>
              <p className="text-gray-600">
                {auth?.user?.email || "john.doe@example.com"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium">Default Address</h3>
                <p className="text-sm text-gray-600">123 Main St, City</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium">Member Since</h3>
                <p className="text-sm text-gray-600">March 2024</p>
              </div>
            </div>
            <Link
              to={"/ordered/item"}
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-lg">Ordered Item</h3>
                  <p className="text-sm text-gray-600">View your past orders</p>
                </div>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Conditional Rendering */}
        {role === "owner" ? (
          <>
            <div
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center mb-20"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusCircle className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold">Add Your Restaurant</h3>
              <p className="text-gray-600 text-center mb-4">
                Start managing your restaurant by adding it to our platform.
              </p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add Restaurant
              </button>
            </div>
            <div className="mb-10"></div>
            <RestaurantProfileCard
              Restaurants={restaurantList}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
            {isModalOpen && (
              <RestaurantForm
                onClose={handleCloseModal}
                editData={editRestaurant}
                setRestaurantList={setRestaurantList}
                restaurantList={restaurantList}
              />
            )}
          </>
        ) : (
          <OrderHistory />
        )}
      </div>
    </>
  );
}

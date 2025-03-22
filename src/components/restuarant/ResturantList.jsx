import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import useRestaurantApi from "../../features/Restuarant/restaurantApi";
import RestuarantCard from "./RestuarantCard";

export function RestaurantList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [restaurantList, setRestaurantList] = useState([]);
  const { getRestaurant, deleteRestaurant, loading, error } =
    useRestaurantApi();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getRestaurant();
      if (data) {
        setRestaurantList(data);
      }
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurantList.filter(
    (restaurant) =>
      (restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedCategory || restaurant.cuisine.includes(selectedCategory))
  );

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
  });


  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Restaurants Near You</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search restaurants by name or location..."
              className="w-full p-3 pl-10 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          <select
            className="p-3 border rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {/* Fetch categories dynamically if needed */}
          </select>
          <select
            className="p-3 border rounded-lg"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Sort by Rating</option>
            <option value="deliveryTime">Sort by Delivery Time</option>
          </select>
        </div>
      </div>

      <RestuarantCard
        Restaurants={sortedRestaurants}
        
      />
    </div>
  );
}

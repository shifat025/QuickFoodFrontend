import { Clock, DollarSign, MapPin, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { restaurants } from "../../../data";
import { Menu } from "./Menu"; 

export default function RestaurantDetails() {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);

  console.log(id);

  if (!restaurant) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-[300px] -mx-4 sm:-mx-6 lg:-mx-8 mb-8">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {restaurant.name}
            </h1>
            <p className="text-xl text-gray-200 mb-4">
              {restaurant.description}
            </p>
            <div className="flex items-center space-x-6 text-white">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-1" />
                <span>Min. ${restaurant.minimumOrder}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8 max-w-7xl mx-auto">
        <div className="lg:col-span-3">
          <Menu restaurant={restaurant} />
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="font-semibold mb-4">Restaurant Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-1" />
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-gray-600">{restaurant.location}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-400 mr-2 mt-1" />
                <div>
                  <h4 className="font-medium">Delivery Time</h4>
                  <p className="text-gray-600">{restaurant.deliveryTime}</p>
                </div>
              </div>
              <div className="flex items-start">
                <DollarSign className="h-5 w-5 text-gray-400 mr-2 mt-1" />
                <div>
                  <h4 className="font-medium">Minimum Order</h4>
                  <p className="text-gray-600">${restaurant.minimumOrder}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-2">Cuisines</h3>
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisine.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

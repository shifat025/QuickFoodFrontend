import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RestaurantProfileCard({
  Restaurants,
  handleDelete,
  handleEdit,
}) {
  const navigate = useNavigate();

  const handleCardClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}/menu`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105"
        >
          <div onClick={() => handleCardClick(restaurant.id)}>
            <img
              src={`https://quickfood-x9fk.onrender.com/${restaurant.image}`}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <div
                  className="flex items-center space-x-2"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    onClick={() => handleEdit(restaurant)} // This will open the form in edit mode
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(restaurant.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-3">{restaurant.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

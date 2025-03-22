import { Link } from "react-router-dom";

export default function RestuarantCard({ Restaurants }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105"
        >
          <Link to={`restaurant/${restaurant.id}`}>
            <img
              src={`http://localhost:8000/${restaurant.image}`}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
              </div>
              <p className="text-gray-600 mb-3">{restaurant.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

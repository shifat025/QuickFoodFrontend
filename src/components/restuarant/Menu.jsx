import { Minus, Plus, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import useMenuApi from "../../features/Menuitem/menuApi";
import { OrderConfirmation } from "./OrderConfirmation";

export function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [currentOrder, setCurrentOrder] = useState(null);

  const { getMenuItems, loading, error } = useMenuApi();
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const loadMenuItems = async () => {
      const items = await getMenuItems(id);
      if (items) {
        setMenuItems(items);
      }
    };
    loadMenuItems();
  }, [id]);

  useEffect(() => {
    // Recalculate subtotal when quantities change
    const newSubtotal = menuItems.reduce((total, item) => {
      const itemQuantity = quantities[item.id] || 0;
      return total + itemQuantity * item.price;
    }, 0);
    setSubTotal(newSubtotal);
  }, [quantities, menuItems]);

  const handleIncrease = (itemID) => {
    if (!currentOrder || currentOrder === itemID) {
      setQuantities((prevQuantities) => {
        const newQuantities = {
          ...prevQuantities,
          [itemID]: (prevQuantities[itemID] || 0) + 1,
        };
        return newQuantities;
      });
      setCurrentOrder(itemID); // Lock the order to this item
    }
  };

  const handleDecrease = (itemId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (newQuantities[itemId] > 0) {
        newQuantities[itemId] -= 1;
      }
      return newQuantities;
    });

    // If the quantity of the current item goes to zero, unlock the current order
    if (quantities[itemId] === 1) {
      setCurrentOrder(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu items</div>;

  const handlePlaceOrder = () => {
    navigate(`/order-confirmation`, {
      state: { items: menuItems.filter((item) => quantities[item.id] > 0), subtotal: subTotal, quantity: quantities },
    });
  };

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Restaurant Name</h2>
              <p className="text-gray-600 mt-2">Restaurant description goes here.</p>
              <div className="mt-2 flex items-center space-x-4 text-gray-500">
                <span className="text-sm">🕒 Delivery Time</span>
                <span className="text-sm">⭐ Rating</span>
                <span className="text-sm">💰 Min. Order</span>
              </div>
            </div>
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
              Closed
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="space-y-4">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out ${
                  currentOrder && currentOrder !== item.id
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="text-xl font-semibold text-gray-900">{item.name}</h4>
                    </div>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                    <p className="text-gray-800 font-medium mt-2 text-xl">${item.price}</p>
                  </div>
                  <img src={item.imageUrl} alt={item.name} className="w-28 h-28 object-cover rounded-lg ml-4 shadow-md" />
                </div>
                <div className="mt-4 flex justify-end items-center space-x-3">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    disabled={currentOrder && currentOrder !== item.id}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-150"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="font-semibold">{quantities[item.id] || 0}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    disabled={currentOrder && currentOrder !== item.id}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-150"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-6 right-6 left-6 md:left-auto md:right-78">
          <div className="bg-white p-6 rounded-lg shadow-lg md:w-72">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-xl">Subtotal</span>
              <span className="text-lg font-bold text-gray-900">${subTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePlaceOrder} // Add the onClick handler here
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md flex items-center justify-center space-x-2 hover:bg-blue-700 transition duration-150"
            >
              <ShoppingCart size={20} />
              <span>
                Place Order (
                {Object.values(quantities).reduce((acc, curr) => acc + curr, 0)} items)
              </span>
            </button>
            <p className="text-red-600 text-sm mt-2 text-center">Minimum order amount: $0.00</p>
          </div>
        </div>
      </div>
    </>
  );
}

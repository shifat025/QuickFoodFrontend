import { useEffect, useState } from "react";
import useOrderApi from "../../features/Order/orderApi";
import { useAxios } from "../../hooks/useAxios";
import Header from "../common/Header";
import Footer from "../common/Footer";

export default function UpdateStatus() {
  const [ordersHistory, setOrdersHistory] = useState([]);
  const { getOrder } = useOrderApi();
  const { api } = useAxios();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const orders = await getOrder();
      if (orders) {
        setOrdersHistory(orders);
      }
    };
    fetchOrderHistory();
  }, []);

  const handleStatusUpdate = async (id, newStatus, currentStatus) => {
    // Check if trying to change the status back to a previous state
    const statusOrder = ["Preparing", "Out for Delivery", "Delivered"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const newIndex = statusOrder.indexOf(newStatus);

    if (newIndex < currentIndex) {
      console.log("Cannot revert to a previous status");
      return; // Prevent status update if trying to go backward
    }

    try {
      const response = await api.patch(`order/${id}/update-status/`, {
        status: newStatus,
      });
      if (response.status === 200) {
        setOrdersHistory((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
    <Header/>
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      <h3 className="text-xl font-bold mb-6">Order History</h3>
      <div className="space-y-6">
        {ordersHistory.map((order) => (
          <div key={order.id} className="border-b last:border-0 pb-6 last:pb-0">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium">{order.name}</h4>
                <p className="text-sm text-gray-600">
                  Order #{order.id} •{" "}
                  {new Date(order.order_created).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  {order.status}
                </span>
                <p className="font-medium mt-1">${order.total_price}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <div>
                <span>
                  {order.number}x {order.name}
                </span>
                <div className="mt-2">
                  <p>Delivery Address: {order.DeliveryAdress}</p>
                  <p>Instructions: {order.DeliveryInstructions}</p>
                </div>
              </div>
              <div className="text-right">
                {/* Render the status update section only if the order is not delivered */}
                {order.status !== "Delivered" && (
                  <>
                    <label className="block text-sm font-medium text-gray-700">
                      Update Status:
                    </label>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(
                          order.id,
                          e.target.value,
                          order.status
                        )
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option
                        value="Preparing"
                        disabled={order.status === "Out for Delivery"}
                      >
                        Preparing
                      </option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
}

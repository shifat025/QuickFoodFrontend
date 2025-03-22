

import { CheckCircle, Clock, MapPin, Phone, Truck } from "lucide-react"; // Import Lucide icons
import { useEffect, useState } from "react";
import useOrderApi from "../../features/Order/orderApi";

export default function OrderHistory() {
  const [ordersHistory, setOrdersHistory] = useState([]);
  const { getMyOrderHistory ,loading, error} = useOrderApi();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const orders = await getMyOrderHistory();
      if (orders) {
        setOrdersHistory(orders);
      }
    };

    fetchOrderHistory();
  }, []);

  const steps = [
    {
      status: "Preparing",
      icon: Clock,
      description: "Restaurant is preparing your order",
    },
    {
      status: "Out for Delivery",
      icon: Truck,
      description: "Order is on the way",
    },
    {
      status: "Delivered",
      icon: CheckCircle,
      description: "Order has been delivered",
    },
  ];
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
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Order Status</h2>

      {ordersHistory.map((order) => {
        // Determine the current step index based on the status
        const currentStepIndex = steps.findIndex(
          (step) => step.status === order.status
        );

        return (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Order placed at:</p>
                  <p className="font-medium">
                    {new Date(order.order_created).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{
                      width: `${
                        ((currentStepIndex + 1) / steps.length) * 100
                      }%`,
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                  ></div>
                </div>
                <div className="flex justify-between mb-8">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                      <div
                        key={step.status}
                        className={`flex flex-col items-center flex-1 ${
                          index < steps.length - 1 ? "relative" : ""
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                            isCompleted
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          <Icon size={24} />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isCurrent ? "text-blue-600" : "text-gray-500"
                          }`}
                        >
                          {step.status}
                        </span>
                        <span className="text-xs text-gray-500 text-center mt-1">
                          {step.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Delivery Address
                  </h3>
                  <p className="text-gray-600 mt-1">{order.DeliveryAdress}</p>
                  {order.DeliveryInstructions && (
                    <p className="text-gray-500 text-sm mt-1">
                      Note: {order.DeliveryInstructions}
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Contact
                  </h3>

                  <p className="text-gray-600">{order.number}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>
                      {order.number}x {order.name}
                    </span>
                    <span>${order.total_price}</span>
                  </div>
                  <div className="border-t mt-2 pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${order.total_price}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Paid via{" "}
                      {order.payment_method === "COD"
                        ? "Cash on Delivery"
                        : "Credit Card"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

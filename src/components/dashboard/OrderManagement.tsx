import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";

const orders = [
  {
    id: "#2057",
    customer: "Rahim Ahmed",
    items: "2x Chicken Burger, 1x French Fries",
    total: 450,
    status: "delivered",
    time: "20 minutes ago",
  },
  {
    id: "#2058",
    customer: "Farhana Khan",
    items: "1x Beef Burger, 1x Coke",
    total: 320,
    status: "processing",
    time: "5 minutes ago",
  },
  {
    id: "#2059",
    customer: "Kamal Hossain",
    items: "2x Pizza, 1x Mountain Dew",
    total: 850,
    status: "pending",
    time: "1 minute ago",
  },
  {
    id: "#2060",
    customer: "Sabrina Akter",
    items: "1x Chicken Biryani",
    total: 220,
    status: "cancelled",
    time: "1 hour ago",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "pending":
      return (
        <span className="inline-flex bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        </span>
      );
    case "processing":
      return (
        <span className="inline-flex bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          <span className="flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            Processing
          </span>
        </span>
      );
    case "delivered":
      return (
        <span className="inline-flex bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Delivered
          </span>
        </span>
      );
    case "cancelled":
      return (
        <span className="inline-flex bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
          <span className="flex items-center gap-1">
            <XCircle className="w-4 h-4" />
            Cancelled
          </span>
        </span>
      );
  }
};

const OrderManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Order Management</h2>
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-lg">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <input
            type="text"
            placeholder="Search orders..."
            className="px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="pb-4">Order ID</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Items</th>
                <th className="pb-4">Total</th>
                <th className="pb-4">Time</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="py-4">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.items}</td>
                  <td>৳{order.total}</td>
                  <td>{order.time}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <select className="w-auto min-w-[140px] px-3 py-1 border rounded-lg text-sm">
                      <option>Update Status</option>
                      <option>Accept Order</option>
                      <option>Start Preparing</option>
                      <option>Mark Delivered</option>
                      <option>Cancel Order</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
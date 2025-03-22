import {
    ArrowDown,
    ArrowUp,
    Clock,
    DollarSign,
    ShoppingBag,
    Star
} from 'lucide-react';
import { BarChart, LineChart } from './Charts';

export function RestaurantDashboard() {
  return (
    <>
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-600">Total Revenue</p>
                <h3 className="text-2xl font-bold">৳24,500</h3>
                <p className="text-green-600 flex items-center mt-2">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  12% up
                </p>
              </div>
              <div className="bg-blue-100 flex items-center justify-center p-3 h-11 w-11 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-600">Total Orders</p>
                <h3 className="text-2xl font-bold">1,415</h3>
                <p className="text-red-600 flex items-center mt-2">
                  <ArrowDown className="w-4 h-4 mr-1" />
                  4% down
                </p>
              </div>
              <div className="bg-orange-100 flex items-center justify-center p-3 h-11 w-11 rounded-full">
                <ShoppingBag className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-600">Avg. Delivery Time</p>
                <h3 className="text-2xl font-bold">32 min</h3>
                <p className="text-green-600 flex items-center mt-2">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  8% better
                </p>
              </div>
              <div className="bg-green-100 flex items-center justify-center p-3 h-11 w-11 rounded-full">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-600">Customer Rating</p>
                <h3 className="text-2xl font-bold">4.8</h3>
                <p className="text-green-600 flex items-center mt-2">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  0.2 points up
                </p>
              </div>
              <div className="bg-purple-100 flex items-center justify-center p-3 h-11 w-11 rounded-full">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
            <LineChart />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Orders by Category</h3>
            <BarChart />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Items</th>
                  <th className="pb-4">Total</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-4">#2057</td>
                  <td>John Doe</td>
                  <td>2x Burger, 1x Fries</td>
                  <td>৳450</td>
                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Delivered
                    </span>
                  </td>
                </tr>
                {/* Add more order rows */}
              </tbody>
            </table>
          </div>
        </div>
      </>
  );
}
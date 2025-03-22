import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { useAxios } from '../../hooks/useAxios';

export function OrderConfirmation() {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // Default to 'cash'
  const location = useLocation();
  const navigate = useNavigate();
  const { items, subtotal, quantity } = location.state || {}; 
  const {api} = useAxios()

  const deliveryFee = 4.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + deliveryFee + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!items || !subtotal) {
      console.error("Order details are missing.");
      return;
    }
  
    // Assuming only the first item is being sent
    const firstItem = items[0];
  
    // Convert quantity to an integer
    const itemQuantity = parseInt(quantity[firstItem.id], 10);
  
    const orderData = {
      menuitem: firstItem.id,
      name: firstItem.name,
      number: contactNumber,
      payment_method: paymentMethod === "cash" ? "COD" : "Online",
      DeliveryAdress: address,
      DeliveryInstructions: deliveryInstructions,
      status: "Preparing",
      total_price: (firstItem.price * itemQuantity).toFixed(2),
      quantity: itemQuantity,
    };
  
    try {
      const response = await api.post("/order/create/", orderData);
  
      if (response.status === 201) {
        console.log("Order placed successfully!", response.data);
        // navigate('/order-tracking', { state: response.data });
        // Redirect to a success page or show a confirmation message
      } else {
        console.error("Failed to place order.");
      }
    } catch (error) {
      console.error("Error submitting order:", error.response ? error.response.data : error.message);
    }
  };
  
  
  
  

  return (
    <>
      <Header />
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Order Confirmation</h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between mb-2">
                  <div>
                    <span className="font-medium">
                      {quantity[item.id]}x {item.name}
                    </span>
                    {item.specialInstructions && (
                      <p className="text-sm text-gray-500 ml-6">
                        Note: {item.specialInstructions}
                      </p>
                    )}
                  </div>
                  <span>${(item.price * quantity[item.id]).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <input
              type="tel"
              required
              className="w-full p-2 border rounded"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Delivery Address</label>
            <textarea
              required
              className="w-full p-2 border rounded"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Delivery Instructions (Optional)</label>
            <textarea
              className="w-full p-2 border rounded"
              rows={2}
              placeholder="E.g., Ring doorbell, leave at door, etc."
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Payment Method</label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                <span className="ml-2">Cash on Delivery</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                />
                <span className="ml-2">Online Payment</span>
              </label>
            </div>
          </div>

          {/* Show warning when online payment is selected */}
          {paymentMethod === 'online' && (
            <div className="text-red-600 font-medium">
              Online payment is now not available, please try Cash on Delivery.
            </div>
          )}

          {/* Button styling */}
          <button
            type="submit"
            className={`w-full px-6 py-3 rounded-lg shadow-md ${
              paymentMethod === 'online'
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' // Disabled style
                : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
            }`}
            disabled={paymentMethod === 'online'} // Disable when 'online' is selected
          >
            Confirm Order
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

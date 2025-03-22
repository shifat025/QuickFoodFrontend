import React, { useState } from 'react';

export function OrderConfirmation({ items, onConfirm }) {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const deliveryFee = 4.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + deliveryFee + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(customerName, address);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Order Confirmation</h2>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.menuItem.id} className="flex justify-between mb-2">
              <div>
                <span className="font-medium">
                  {item.quantity}x {item.menuItem.name}
                </span>
                {item.specialInstructions && (
                  <p className="text-sm text-gray-500 ml-6">Note: {item.specialInstructions}</p>
                )}
              </div>
              <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
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
        <input type="text" required placeholder="Name" className="w-full p-2 border rounded" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        <input type="tel" required placeholder="Contact Number" className="w-full p-2 border rounded" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        <textarea required placeholder="Delivery Address" className="w-full p-2 border rounded" rows={3} value={address} onChange={(e) => setAddress(e.target.value)} />
        <textarea placeholder="Delivery Instructions (Optional)" className="w-full p-2 border rounded" rows={2} value={deliveryInstructions} onChange={(e) => setDeliveryInstructions(e.target.value)} />
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
            <span className="ml-2">Credit Card</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="paymentMethod" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
            <span className="ml-2">Cash on Delivery</span>
          </label>
        </div>
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <input type="text" required placeholder="Card Number" className="w-full p-2 border rounded" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" required placeholder="MM/YY" className="w-full p-2 border rounded" />
              <input type="text" required placeholder="CVV" className="w-full p-2 border rounded" />
            </div>
          </div>
        )}
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium">
          Place Order - ${total.toFixed(2)}
        </button>
      </form>
    </div>
  );
}
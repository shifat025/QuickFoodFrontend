import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: Utensils,
    title: 'Quality Food',
    description: 'We partner with the best local restaurants to ensure quality meals.',
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Get your food delivered within 45 minutes or get a refund.',
  },
  {
    icon: Shield,
    title: 'Secure Ordering',
    description: 'Your payment and personal information are always protected.',
  },
];

export default function FeaturedSection() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose QuickFood?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best food delivery experience in your city.
            Here's what makes us different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800"
              alt="Download our app"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white p-6">
                <h3 className="text-2xl font-bold mb-2">Download Our App</h3>
                <p className="mb-4">Get exclusive offers and track your orders in real-time</p>
                <button className="bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-100">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=800"
              alt="Partner with us"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white p-6">
                <h3 className="text-2xl font-bold mb-2">Partner With Us</h3>
                <p className="mb-4">Join our network of restaurants and grow your business</p>
                <button className="bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-100">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
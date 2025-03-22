import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920',
    title: 'Delicious Food Delivered To Your Door',
    description: 'Order from the best local restaurants with easy, on-demand delivery.',
    link: '/restaurants',
  },
  {
    image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1920',
    title: 'Fresh & Healthy Options',
    description: 'Discover restaurants that serve healthy and nutritious meals.',
    link: '/restaurants',
  },
  {
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1920',
    title: 'Quick & Easy Ordering',
    description: 'Simple ordering process with real-time delivery tracking.',
    link: '/restaurants',
  },
];

export default function Hero() {
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 mb-12">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-[500px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <div className="absolute inset-0 bg-black/50 z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
                <div className="max-w-3xl px-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-gray-200 mb-8">{slide.description}</p>
                  <Link
                    to={slide.link}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Order Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
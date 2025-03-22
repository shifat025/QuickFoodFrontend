import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../../data';


export function PopularCategories() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
          <p className="text-gray-600">Explore restaurants by your favorite cuisine</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/restaurants?category=${category.name}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition group-hover:shadow-lg">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <div className="p-6 flex items-center justify-center">
                    <h3 className="text-lg font-semibold text-center group-hover:text-blue-600">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
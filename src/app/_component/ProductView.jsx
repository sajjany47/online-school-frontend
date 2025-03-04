import React from "react";

const ProductView = () => {
  return (
    <>
      {/* component */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col items-center md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/3 p-4 relative">
            <div className=" ">
              <img
                src="https://rukminim2.flixcart.com/image/312/312/xif0q/computer/k/8/k/15-fa1226tx-gaming-laptop-hp-original-imah4bjbx8ctzdg6.jpeg"
                alt="HP Victus Laptop"
                className="w-full h-auto object-cover rounded-lg"
              />
              <button className="absolute top-2 right-2 text-red-500 hover:text-red-600 focus:outline-none">
                <svg
                  className="w-6 h-6 absolute top-0 right-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Product Details */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              HP Victus Gaming Laptop
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Intel Core i5 12th Gen 12450H - (8 GB/512 GB SSD/Windows 11 Home/4
              GB Graphics/NVIDIA GeForce RTX 2050)
            </p>
            <div className="flex items-center mb-4">
              <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">
                4.5 ★
              </span>
              <span className="text-sm text-gray-500 ml-2">1,234 reviews</span>
            </div>
            <ul className="text-sm text-gray-700 mb-6">
              <li className="flex items-center mb-1">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Core i5 Processor (12th Gen)
              </li>
              <li className="flex items-center mb-1">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                8 GB DDR4 RAM
              </li>
              <li className="flex items-center mb-1">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Windows 11 Home
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                512 GB SSD
              </li>
            </ul>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-3xl font-bold text-gray-900">
                  $899.00
                </span>
                <span className="ml-2 text-sm font-medium text-gray-500 line-through">
                  $1,000.00
                </span>
              </div>
              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                Save 10%
              </span>
            </div>
            <p className="text-green-600 text-sm font-semibold mb-4">
              Free Delivery
            </p>
            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                Buy Now
              </button>
              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;

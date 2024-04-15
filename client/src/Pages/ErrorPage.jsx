import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
      <p className="text-xl text-gray-700 mb-8">
        Something went wrong. Please try again later.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;

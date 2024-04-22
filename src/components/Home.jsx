import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white-800 mb-4">
          Дизайн футболок
        </h1>
        <p className="text-lg text-white-500 mb-8">
          Создай свой уникальный дизайн
        </p>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to="design"
        >
          Начать
        </Link>
      </div>
    </div>
  );
};

export default Home;

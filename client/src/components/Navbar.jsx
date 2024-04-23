import React from 'react';

const Navbar = () => {
  return (
    <div className="mb-28">
      <nav className="bg-gray-800 py-4 fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-4">
        <a href="/">
          <h1 className="text-white text-3xl font-bold text-center ">
            Майки онлайн
          </h1>
        </a>

        <div className="flex gap-4">
          <a href="/design" className="text-white font-medium">
            Конструктор
          </a>
          <a href="/login" className="text-white font-medium">
            Войти
          </a>
          <a href="/register" className="text-white font-medium">
            Регистрация
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

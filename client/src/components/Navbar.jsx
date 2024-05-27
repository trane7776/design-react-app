import React from 'react';

const Navbar = ({ user }) => {
  return (
    <div className="mb-20">
      <nav className="bg-gray-800 py-4 fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-4 shadow-lg">
        <a href="/" className="text-white text-3xl font-bold">
          Майки онлайн
        </a>
        <div className="flex gap-4">
          {user ? (
            <a href="/account" className="text-white font-medium">
              Личный кабинет
            </a>
          ) : (
            <>
              <a href="/login" className="text-white font-medium">
                Войти
              </a>
              <a href="/register" className="text-white font-medium">
                Регистрация
              </a>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

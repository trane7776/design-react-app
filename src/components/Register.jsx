// Register.jsx
import React from 'react';

function Register() {
  return (
    <div className="bg-gray-800 p-4 w-3/6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Регистрация</h2>
      <form className="flex flex-col ">
        <label className="flex flex-col mb-2 text-white">
          Введите ваше имя:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="text"
            name="name"
          />
        </label>
        <label className="flex flex-col mb-2 text-white">
          Имя пользователя:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="text"
            name="username"
          />
        </label>
        <label className="flex flex-col mb-2 text-white">
          Пароль:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="password"
            name="password"
          />
        </label>
        <label className="flex flex-col mb-2 text-white">
          Повторите пароль:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="password"
            name="password"
          />
        </label>
        <label className="flex flex-col mb-2 text-white">
          Почта:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="email"
            name="email"
          />
        </label>

        <input
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded w-1/4"
          type="submit"
          value="Зарегистрироваться"
        />
      </form>
    </div>
  );
}

export default Register;

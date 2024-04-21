import React from 'react';

const Login = () => {
  return (
    <div className="bg-gray-800 p-4 w-3/6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Логин</h2>
      <form className="flex flex-col ">
        <label className="flex flex-col mb-2 text-white">
          Введите почту или имя пользователя:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="username"
            name="name"
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

        <button className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded w-1/4 mt-5">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;

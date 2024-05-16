// Register.jsx
import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = () => {
    if (password === confirmPassword) {
    }
  };

  return (
    <div className="bg-gray-800 p-4 w-3/6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Регистрация</h2>
      <form className="flex flex-col ">
        <label className="flex flex-col mb-2 text-white">
          Имя пользователя:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="flex flex-col mb-2 text-white">
          Почта:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="flex flex-col mb-2 text-white">
          Пароль:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="flex flex-col mb-2 text-white">
          Повторите пароль:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="password"
            name="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <button
          onClick={() => handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded w-1/4 mt-5"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Register;

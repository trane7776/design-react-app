import React, { useState } from 'react';
import { redirect } from 'react-router-dom';

const Register = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://design-react-app-production.up.railway.app/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, username }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to register');
      } else {
        alert('Registered.');
        const user = await response.json();
        setUser(user);
        redirect('/');
      }

      // Handle successful registration
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register');
    }
  };

  return (
    <div className="bg-gray-800 p-4 w-3/6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Регистрация</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="flex flex-col mb-2 text-white">
          Имя пользователя:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="flex flex-col mb-2 text-white">
          Почта:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="flex flex-col mb-2 text-white">
          Пароль:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="flex flex-col mb-2 text-white">
          Повторите пароль:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded w-1/4 mt-5">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Register;

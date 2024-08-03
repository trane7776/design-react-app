// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://continued-ariella-treeeea-faaad991.koyeb.app/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: username, password }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to login');
      } else {
        const user = await response.json();
        setUser(user);
        alert('Success');
        navigate('/');
      }

      // Handle successful login
    } catch (error) {
      console.error('Login error:', error);
      // Handle errors
    }
  };

  return (
    <div className="bg-gray-800 p-4 w-3/6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Логин</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="flex flex-col mb-2 text-white">
          Введите почту или имя пользователя:
          <input
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
            type="username"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded w-1/4 mt-5">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;

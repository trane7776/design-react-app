import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Account = ({ user, setUser }) => {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserDesigns();
    }
  }, [user]);

  const fetchUserDesigns = async () => {
    try {
      const response = await fetch(
        `https://design-react-app-production.up.railway.app/user-designs?user=${user.username}`
      );
      const data = await response.json();
      setDesigns(data);
    } catch (error) {
      console.error('Error fetching user designs:', error);
    }
  };

  const deleteDesign = async (id) => {
    try {
      const response = await fetch(
        `https://design-react-app-production.up.railway.app/design/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setDesigns(designs.filter((design) => design._id !== id));
      } else {
        console.error('Failed to delete design');
      }
    } catch (error) {
      console.error('Error deleting design:', error);
    }
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };
  return (
    <div className="bg-gray-800 p-4 w-3/6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Личный кабинет</h2>
      <p className="text-white">Почта: {user ? user.email : ''}</p>
      <p className="text-white">
        Имя пользователя: {user ? user.username : ''}
      </p>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-700 cursor-pointer text-white font-bold py-2 px-4 rounded mt-5"
      >
        Выйти
      </button>
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Мои дизайны</h3>
        {designs.length > 0 ? (
          designs.map((design) => (
            <div key={design._id} className="bg-gray-700 p-4 rounded mb-4">
              <img src={design.image} alt={design.name} className="mb-4" />
              <h4 className="text-lg text-white">{design.name}</h4>
              <button
                onClick={() => deleteDesign(design._id)}
                className="bg-red-500 hover:bg-red-700 cursor-pointer text-white font-bold py-2 px-4 rounded mt-4"
              >
                Удалить
              </button>
            </div>
          ))
        ) : (
          <p className="text-white">У вас нет дизайнов</p>
        )}
      </div>
    </div>
  );
};

export default Account;

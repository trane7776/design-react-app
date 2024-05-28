import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DesignDetail = ({ user }) => {
  const { id } = useParams();
  const [design, setDesign] = useState(null);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await fetch(
          `https://design-react-app-production.up.railway.app/design/${id}`
        );
        const data = await response.json();
        setDesign(data);
      } catch (error) {
        console.error('Error fetching design:', error);
      }
    };

    fetchDesign();
  }, [id]);

  if (!design) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 p-4 w-3/6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">{design.name}</h2>
      <img src={design.image} alt={design.name} className="mb-4" />
      <p className="text-white">Пользователь: {design.user}</p>
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Комментарии</h3>

        <p className="text-white">Комментариев пока нет</p>
      </div>
    </div>
  );
};

export default DesignDetail;

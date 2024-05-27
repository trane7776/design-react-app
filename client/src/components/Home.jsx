import DesignCard from './DesignCard';
import { useEffect, useState } from 'react';
const Home = () => {
  const [designs, setDesigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch('http://localhost:8080/design');
        const data = await response.json();

        setDesigns(data);
      } catch (error) {
        console.error('Error fetching designs:', error);
      }
    };

    fetchDesigns();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDesigns = designs.filter((design) =>
    design.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen">
      <div className="text-center mt-16">
        <h1 className="text-4xl font-bold text-white mb-4">Дизайн футболок</h1>
        <p className="text-lg text-gray-400 mb-8">
          Создай свой уникальный дизайн
        </p>
        <a
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/design"
        >
          Начать
        </a>
      </div>
      <section className="mt-6 w-full flex flex-col items-center sm:mt-20">
        <h1 className="text-3xl font-bold text-white mb-8">
          Дизайны пользователей
        </h1>
        <input
          type="text"
          placeholder="Поиск футболки"
          className="px-2 py-1 rounded bg-gray-700 text-white placeholder-gray-400"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="mt-12 ml-20 flex w-full flex-wrap justify-center gap-8 sm:justify-start">
          {filteredDesigns.map((design) => (
            <DesignCard
              key={design._id}
              title={design.name}
              image={design.image}
              user={design.user}
              id={design._id}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

import DesignCard from './DesignCard';
import { useEffect, useState } from 'react';
const Home = () => {
  const [designs, setDesigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch(
          'https://continued-ariella-treeeea-faaad991.koyeb.app/design'
        );
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
    <div className="flex flex-col items-center bg-gray-900 pb-20">
      <div className="flex items-center  mt-10 flex-col text-center">
        <h1 className="md:text-9xl font-bold text-white mb-4">
          Дизайн футболок
        </h1>
        <p className="md:text-4xl mt-10 text-gray-400 mb-8">
          Создай свой уникальный дизайн
        </p>
        <a
          className="bg-blue-500 md:text-2xl  hover:bg-blue-700 text-white font-bold py-5 px-10 md:py-12 md:px-24 rounded"
          href="/design"
        >
          Начать
        </a>
        <a href="#designs" className="cursor-pointer m-10">
          Перейти к дизайнам пользователей
        </a>
      </div>
      <section id="designs" className=" w-full flex flex-col items-center ">
        <h1 className="text-center text-3xl font-bold text-white mb-8">
          Дизайны пользователей
        </h1>
        <input
          type="text"
          placeholder="Поиск футболки"
          className="px-2 py-1 rounded bg-gray-700 text-white placeholder-gray-400"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <div className="design-container mt-12 flex w-full flex-wrap justify-center gap-8 ">
          {filteredDesigns.length > 0 ? (
            filteredDesigns.map((design) => (
              <DesignCard
                key={design._id}
                title={design.name}
                image={design.image}
                user={design.user}
                id={design._id}
              />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

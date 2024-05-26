import DesignCard from './DesignCard';
const Home = () => {
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
        <div className="mt-12 ml-20 flex w-full flex-wrap justify-center gap-8 sm:justify-start">
          <DesignCard
            title="Пепси дизайн"
            image="./Pepsi.png"
            user="admin"
            id="1"
          />
          <DesignCard
            title="Пепси дизайн"
            image="./Pepsi.png"
            user="admin"
            id="1"
          />
          <DesignCard
            title="Пепси дизайн"
            image="./Pepsi.png"
            user="admin"
            id="1"
          />
          <DesignCard
            title="Пепси дизайн"
            image="./Pepsi.png"
            user="admin"
            id="1"
          />
          <DesignCard
            title="Пепси дизайн"
            image="./Pepsi.png"
            user="admin"
            id="1"
          />
          <DesignCard
            title="Пепси дизайн"
            image="./Pepsi.png"
            user="admin"
            id="1"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;

import DesignCard from './DesignCard';
const Home = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white-800 mb-4">
          Дизайн футболок
        </h1>
        <p className="text-lg text-white-500 mb-8">
          Создай свой уникальный дизайн
        </p>
        <a
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/design"
        >
          Начать
        </a>
        <section className="flex-center mt-6 w-full flex-col sm:mt-20">
          <h1 className="heading3 self-start text-white-800">
            Дизайны пользователей
          </h1>
          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
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
    </div>
  );
};

export default Home;

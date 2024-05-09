const Home = () => {
  const designs = [
    { id: 1, name: 'Design 1', imageUrl: 'https://example.com/design1.jpg' },
    { id: 2, name: 'Design 2', imageUrl: 'https://example.com/design2.jpg' },
    { id: 3, name: 'Design 3', imageUrl: 'https://example.com/design3.jpg' },
    // Add more designs as needed
  ];

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
        {designs.map((design) => (
          <div key={design.id}>
            <h2>{design.name}</h2>
            <img src={design.imageUrl} alt={design.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

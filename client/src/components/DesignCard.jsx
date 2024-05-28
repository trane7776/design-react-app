import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import potrace from 'potrace';
const DesignCard = ({ id, title, image, user }) => {
  const handleCardClick = () => {
    window.location.href = `/design/${id}`;
  };
  const handleClick = () => {
    potrace.posterize(image, (err, svg) => {
      if (err) throw err;
      console.log(svg);
      // Сохранение SVG в файл
      const blob = new Blob([svg], { type: 'image/svg+xml' });

      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = 'image.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };
  return (
    <Card className="design-card w-full max-w-xs border border-gray-700 rounded-md shadow-lg bg-gray-800">
      <CardHeader
        onClick={handleCardClick}
        className="cursor-pointer flex flex-col items-center p-4"
      >
        <img
          src={image}
          className="w-full h-48 object-cover rounded-md"
          alt={title}
        />
        <CardTitle className="text-white mt-4">Название: {title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center px-4 py-2">
        <div className="text-gray-400">Пользователь: {user}</div>

        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
          onClick={handleClick}
        >
          Сохранить в SVG
        </button>
      </CardContent>
    </Card>
  );
};

export default DesignCard;

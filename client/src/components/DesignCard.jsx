import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
const DesignCard = ({ id, title, image, user }) => {
  return (
    <Card className="w-full max-w-xs border border-gray-700 rounded-md shadow-lg bg-gray-800">
      <CardHeader className="flex flex-col items-center p-4">
        <img
          src={image}
          className="w-full h-48 object-contain rounded-md"
          alt={title}
        />
        <CardTitle className="text-white mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center px-4 py-2">
        <div className="text-gray-400">{user}</div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
          Комментарии
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
          Save to SVG
        </button>
      </CardContent>
    </Card>
  );
};

export default DesignCard;

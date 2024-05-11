import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
const DesignCard = ({ id, title, image, user }) => {
  return (
    <Card className="w-full max-w-fit border-0 !bg-transparent sm:max-w-[356px]">
      <CardHeader className="flex-center flex-col gap-2.5 !p-0">
        <div className="h-fit w-full">
          <img
            src={image}
            className="h-full rounded-md object-cover"
            alt={title}
          />
        </div>
        <CardTitle className="text-white paragraph-semibold line-clamp-1 w-full text-left">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-between mt-4 p-0">
        <div className="flex-center body-medium text-white gap-2">{user}</div>
      </CardContent>
    </Card>
  );
};

export default DesignCard;

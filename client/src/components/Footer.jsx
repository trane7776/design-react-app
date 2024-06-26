import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-2 flex  fixed bottom-0 left-0 right-0">
      <div className="text-white m-5">
        &copy; {new Date().getFullYear()} Все права защищены
      </div>
    </footer>
  );
};

export default Footer;

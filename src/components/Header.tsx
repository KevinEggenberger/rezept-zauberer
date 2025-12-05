import React from "react";

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-orange-900">
        Rezept-Zauberer
      </h1>
      <p className="mt-2 md:mt-4 text-lg md:text-xl text-stone-600">
        Verwandeln Sie Ihre Zutaten in ein Meisterwerk.
      </p>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import PlusIcon from "./icons/PlusIcon";

interface IngredientInputProps {
  onAddIngredient: (ingredient: string) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({
  onAddIngredient,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddIngredient(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Zutat eingeben (z.B. Tomaten)"
        className="flex-grow w-full px-4 py-3 bg-amber-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
      />
      <button
        type="submit"
        className="bg-orange-500 text-white p-3 rounded-lg shadow-sm hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex-shrink-0"
        aria-label="Zutat hinzufügen"
      >
        <PlusIcon />
      </button>
    </form>
  );
};

export default IngredientInput;

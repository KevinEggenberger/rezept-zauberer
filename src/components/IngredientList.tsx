import React from "react";
import TrashIcon from "./icons/TrashIcon";

interface IngredientListProps {
  ingredients: string[];
  onRemoveIngredient: (ingredient: string) => void;
}

const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  onRemoveIngredient,
}) => {
  if (ingredients.length === 0) {
    return (
      <p className="text-center text-stone-500 mt-4">
        Fügen Sie Ihre verfügbaren Zutaten hinzu.
      </p>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-stone-700 mb-2">Ihre Zutaten:</h3>
      <ul className="flex flex-wrap gap-2">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient}
            className="flex items-center gap-2 bg-amber-100 text-amber-900 text-sm font-medium px-3 py-1.5 rounded-full animate-fade-in"
          >
            <span>{ingredient}</span>
            <button
              onClick={() => onRemoveIngredient(ingredient)}
              className="text-amber-700 hover:text-amber-900 transition-colors"
              aria-label={`Entferne ${ingredient}`}
            >
              <TrashIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientList;

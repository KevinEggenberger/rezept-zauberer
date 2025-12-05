import React from "react";
import { type Recipe } from "../types";

interface RecipeCardProps {
  recipe: Recipe;
  imageUrl: string | null;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, imageUrl }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200 animate-slide-up">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={recipe.recipeName}
          className="w-full h-64 md:h-80 object-cover"
        />
      ) : (
        <div className="w-full h-64 md:h-80 bg-stone-200 flex items-center justify-center">
          <span className="text-stone-500">Bild wird geladen...</span>
        </div>
      )}
      <div className="p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-900">
          {recipe.recipeName}
        </h2>
        <p className="mt-2 text-stone-600 italic">{recipe.description}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-stone-800 border-b-2 border-amber-300 pb-2 mb-4">
              Zutaten
            </h3>
            <ul className="space-y-2 text-stone-700">
              {recipe.ingredients.map((ing, index) => (
                <li key={index} className="flex gap-2">
                  <span className="font-semibold text-orange-700">
                    {ing.quantity}
                  </span>
                  <span>{ing.item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-stone-800 border-b-2 border-amber-300 pb-2 mb-4">
              Anleitung
            </h3>
            <ol className="space-y-4 text-stone-700 list-decimal list-outside pl-5">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="pl-2 leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

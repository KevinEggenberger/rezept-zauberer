import React, { useState, useCallback } from "react";
import { type Recipe } from "./types";
import {
  generateRecipeFromIngredients,
  generateImageForRecipe,
} from "./services/geminiService";
import Header from "./components/Header";
import IngredientInput from "./components/IngredientInput";
import IngredientList from "./components/IngredientList";
import RecipeCard from "./components/RecipeCard";
import LoadingSpinner from "./components/LoadingSpinner";

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>("");

  const addIngredient = (ingredient: string) => {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients(
      ingredients.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  };

  const clearIngredients = () => {
    setIngredients([]);
    setRecipe(null);
    setGeneratedImageUrl(null);
  };

  const handleGenerateRecipe = useCallback(async () => {
    if (ingredients.length === 0) {
      setError("Bitte fügen Sie mindestens eine Zutat hinzu.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipe(null);
    setGeneratedImageUrl(null);

    try {
      setLoadingMessage("Analysiere Zutaten und erstelle ein Rezept...");
      const generatedRecipe = await generateRecipeFromIngredients(ingredients);
      setRecipe(generatedRecipe);

      setLoadingMessage("Generiere ein köstliches Bild des Gerichts...");
      const imageUrl = await generateImageForRecipe(generatedRecipe.recipeName);
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      console.error(err);
      setError(
        "Entschuldigung, beim Erstellen des Rezepts ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
      );
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  }, [ingredients]);

  return (
    <div className="min-h-screen bg-amber-50 text-stone-800 antialiased">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header />

        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-stone-200">
          <IngredientInput onAddIngredient={addIngredient} />
          <IngredientList
            ingredients={ingredients}
            onRemoveIngredient={removeIngredient}
          />

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGenerateRecipe}
              disabled={isLoading || ingredients.length === 0}
              className="w-full sm:w-auto flex-grow bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-orange-700 disabled:bg-stone-300 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              {isLoading ? "Zaubere..." : "Rezept generieren"}
            </button>
            <button
              onClick={clearIngredients}
              disabled={isLoading}
              className="w-full sm:w-auto bg-stone-200 text-stone-700 font-bold py-3 px-6 rounded-lg hover:bg-stone-300 disabled:bg-stone-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
            >
              Alles löschen
            </button>
          </div>
        </div>

        {error && (
          <p className="text-center text-red-600 mt-6 font-semibold">{error}</p>
        )}

        <div className="mt-12 max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center">
              <LoadingSpinner />
              <p className="mt-4 text-lg text-orange-700 animate-pulse">
                {loadingMessage}
              </p>
            </div>
          ) : recipe ? (
            <RecipeCard recipe={recipe} imageUrl={generatedImageUrl} />
          ) : (
            <div className="text-center text-stone-500 mt-16">
              <p>
                Geben Sie Ihre Zutaten ein und klicken Sie auf "Rezept
                generieren".
              </p>
              <p className="mt-1">Ihr magisches Rezept erscheint hier!</p>
            </div>
          )}
        </div>
      </main>
      <footer className="text-center py-6 text-stone-500 text-sm">
        <p>Erstellt von deinem Rezept-Zauberer</p>
      </footer>
    </div>
  );
};

export default App;

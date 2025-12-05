import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { type Recipe } from "../types"; // ✅ korrigierter Pfad

// Get API key from environment, can be null initially
const apiKey = import.meta.env.VITE_API_KEY;

// Create AI instance only if API key exists
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
} else {
  console.warn(
    "⚠️ VITE_API_KEY environment variable not set. The app will not function without a valid Gemini API key."
  );
}

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "Der Name des Rezepts.",
    },
    description: {
      type: Type.STRING,
      description: "Eine kurze, appetitliche Beschreibung des Gerichts.",
    },
    ingredients: {
      type: Type.ARRAY,
      description: "Eine Liste der benötigten Zutaten mit Mengenangaben.",
      items: {
        type: Type.OBJECT,
        properties: {
          item: {
            type: Type.STRING,
            description: "Der Name der Zutat.",
          },
          quantity: {
            type: Type.STRING,
            description: "Die benötigte Menge der Zutat (z.B. '100g', '2 EL').",
          },
        },
        required: ["item", "quantity"],
      },
    },
    instructions: {
      type: Type.ARRAY,
      description: "Die schrittweise Kochanleitung.",
      items: {
        type: Type.STRING,
        description: "Ein einzelner Schritt in der Anleitung.",
      },
    },
  },
  required: ["recipeName", "description", "ingredients", "instructions"],
};

export async function generateRecipeFromIngredients(
  ingredients: string[]
): Promise<Recipe> {
  if (!ai) {
    throw new Error(
      "❌ API Key nicht konfiguriert. Bitte setzen Sie die Umgebungsvariable VITE_API_KEY mit Ihrem Google Gemini API Key."
    );
  }

  const ingredientList = ingredients.join(", ");
  const prompt = `Du bist ein Meisterkoch. Erstelle ein kreatives und köstliches Rezept, das hauptsächlich die folgenden Zutaten verwendet: ${ingredientList}. Du kannst grundlegende Vorratsartikel wie Salz, Pfeffer, Öl, Wasser, Mehl und Zucker annehmen, wenn sie benötigt werden. Konzentriere dich aber auf die bereitgestellten Zutaten. Gib deine Antwort ausschließlich im JSON-Format zurück.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const text = response.text?.trim();
    if (!text) throw new Error("Keine Textantwort von der API erhalten.");

    const parsedJson = JSON.parse(text);

    if (
      parsedJson.recipeName &&
      Array.isArray(parsedJson.ingredients) &&
      Array.isArray(parsedJson.instructions)
    ) {
      return parsedJson as Recipe;
    } else {
      throw new Error(
        "Die von der API generierte JSON-Antwort hat nicht das erwartete Format."
      );
    }
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Konnte kein Rezept von der API abrufen.");
  }
}

export async function generateImageForRecipe(
  recipeName: string
): Promise<string> {
  if (!ai) {
    throw new Error(
      "❌ API Key nicht konfiguriert. Bitte setzen Sie die Umgebungsvariable VITE_API_KEY mit Ihrem Google Gemini API Key."
    );
  }

  const prompt = `Professionelle Food-Fotografie von "${recipeName}". Appetitlich, hochauflösend, gut beleuchtet, auf einem schönen Teller, im Stil eines Kochbuchfotos.`;

  try {
    const response = await ai.models.generateImages({
      model: "imagen-4.0-generate-001",
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: "image/jpeg",
        aspectRatio: "4:3",
      },
    });

    const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    if (!imageBytes) throw new Error("Kein Bild von der API erhalten.");

    return `data:image/jpeg;base64,${imageBytes}`;
  } catch (error) {
    console.error("Error generating image:", error);
    // Fallback-Bild verwenden, falls API nicht verfügbar ist
    return "/images/Fehlerbild.jpg";
  }
}

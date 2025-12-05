export interface Recipe {
  recipeName: string;
  description: string;
  ingredients: {
    item: string;
    quantity: string;
  }[];
  instructions: string[];
}

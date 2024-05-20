export interface Step {
  description: string|null;
  image: string|null;
  timer: string|null;
}

export interface Recipe {
  title: string|null;
  servingSize: number|null;
  country: string|null;
  ingredients: string[]|null;
  steps: Step[]|null;
  rating: number|null;
}
const BASE_URL = "https://recipe-api-x8ol.onrender.com";

export const RecipeSearchApi = () => {
    return BASE_URL + "/api/recipe/search";
};

export const SimilarIngredientsApi = (ingredientSearchString) => {
    return (
        BASE_URL +
        `/api/ingredient/getSimilarIngredients/${ingredientSearchString}`
    );
};

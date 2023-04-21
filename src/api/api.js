const BASE_URL =
    "http://Recipesearchapi-env.eba-bcinprem.ap-south-1.elasticbeanstalk.com:8080";

export const RecipeSearchApi = () => {
    return BASE_URL + "/api/recipe/search";
};

export const SimilarIngredientsApi = (ingredientSearchString) => {
    return (
        BASE_URL +
        `/api/ingredient/getSimilarIngredients/${ingredientSearchString}`
    );
};

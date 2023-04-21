const BASE_URL =
    "http://recipesearchapi-env.eba-bcinprem.ap-south-1.elasticbeanstalk.com";

export const RecipeSearchApi = () => {
    return BASE_URL + "/api/recipe/search";
};

export const SimilarIngredientsApi = (ingredientSearchString) => {
    return (
        BASE_URL +
        `/api/ingredient/getSimilarIngredients/${ingredientSearchString}`
    );
};

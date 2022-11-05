import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./RecipeBox.module.css";
import CookIcon from "./../assets/images/cook.svg";
import TimeIcon from "./../assets/images/time.svg";
import IngredientIcon from "./../assets/images/ingredient.svg";

const RecipeBox = (props) => {
    const history = useHistory();
    const recipeData = props.recipeData;

    const viewRecipeHandler = () => {
        history.push({
            pathname: "/recipe",
            state: { recipe: recipeData },
        });
    };

    const isUpperCase = (text) => {
        if (text === text.toUpperCase() && text !== text.toLowerCase()) {
            return true;
        }
        return false;
    };

    return (
        <div className={classes.recipeBox}>
            <img
                src={CookIcon}
                alt="cook icon"
                className={classes.headerIcon}
            />
            <p className={classes.recipeTitle}>{recipeData.recipeTitle}</p>
            <div className={classes.iconsRow}>
                <div className={classes.iconsBox}>
                    <div className={classes.iconsBoxHeader}>
                        <img src={TimeIcon} alt="Time Icon" />
                        {recipeData.prep_time}
                    </div>
                    <p>Prep Time</p>
                </div>
                <div className={classes.iconsBox}>
                    <div className={classes.iconsBoxHeader}>
                        <img src={TimeIcon} alt="Time Icon" />
                        {recipeData.cook_time}
                    </div>
                    <p>Cook Time</p>
                </div>
                <div className={classes.iconsBox}>
                    <div className={classes.iconsBoxHeader}>
                        <img src={IngredientIcon} alt="Time Icon" />
                        {recipeData.ingredients.length}
                    </div>
                    <p>Ingredients</p>
                </div>
            </div>
            <p>
                {isUpperCase(recipeData.description.substr(0, 1))
                    ? recipeData.description.substr(0, 90) + "..."
                    : recipeData.recipeTitle +
                      " " +
                      recipeData.description.substr(
                          0,
                          90 - recipeData.recipeTitle.length
                      ) +
                      "..."}
            </p>
            <button onClick={viewRecipeHandler}>View Recipe</button>
        </div>
    );
};

export default RecipeBox;

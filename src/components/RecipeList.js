import React from "react";
import classes from "./RecipeList.module.css";
import RecipeBox from "./RecipeBox";

const RecipeList = (props) => {
    return (
        <div className={classes.recipeListContainer}>
            {props.recipeList.map((entry) => {
                return <RecipeBox key={entry.recipeId} recipeData={entry} />;
            })}
        </div>
    );
};

export default RecipeList;

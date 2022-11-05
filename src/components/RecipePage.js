import React from "react";
import { useLocation } from "react-router-dom";
import classes from "./RecipePage.module.css";
import StarRatingComponent from "react-star-rating-component";
import { IoIosStar } from "react-icons/io";
import { BsBoxArrowUpRight, BsVectorPen } from "react-icons/bs";
import { MdRestaurantMenu } from "react-icons/md";
import TimeIcon from "./../assets/images/time.svg";

const RecipePage = () => {
    const location = useLocation();
    const recipe = location.state.recipe;
    const directionsString = recipe.instructions
        .split("|")
        .reduce((final, current) => {
            return final + current;
        }, "");
    const directionsArray = directionsString.split(".");
    let directionsFinal = [];
    let combinedDirection = "";
    for (let i = 0; i < directionsArray.length; i++) {
        combinedDirection += directionsArray[i] + ".";
        if ((i + 1) % 4 === 0) {
            directionsFinal.push(combinedDirection);
            combinedDirection = "";
        }
    }

    const isUpperCase = (text) => {
        if (text === text.toUpperCase() && text !== text.toLowerCase()) {
            return true;
        }
        return false;
    };

    console.log(recipe);

    return (
        <div className={classes.recipePage}>
            <h1>{recipe.recipeTitle + "  "}</h1>
            <div className={classes.ratingRow}>
                <StarRatingComponent
                    name={"Rating"}
                    value={Math.round(recipe.rating)}
                    starColor={"#e63946"}
                    emptyStarColor={"#000000a5"}
                    renderStarIcon={() => <IoIosStar />}
                    editing={false}
                />{" "}
                <span>
                    <b>{parseFloat(recipe.rating).toFixed(2)}</b>
                </span>
                <span className={classes.voteCount}>({recipe.vote_count})</span>
                <span>|</span>
                <span className={classes.timeContainer}>
                    <img src={TimeIcon} alt="Time Icon" />
                    <span>PREP TIME</span>
                    <span>
                        <b>{recipe.prep_time}</b>
                    </span>
                </span>
                <span>|</span>
                <span className={classes.timeContainer}>
                    <img src={TimeIcon} alt="Time Icon" />
                    <span>COOK TIME</span>
                    <span>
                        <b>{recipe.cook_time}</b>
                    </span>
                </span>
                <span>|</span>
                <span className={classes.timeContainer}>
                    <BsVectorPen style={{ color: "black" }} />
                    <span>AUTHOR</span>
                    <span>
                        <b>{recipe.author}</b>
                    </span>
                </span>
            </div>
            <div className={classes.detailsRow}>
                <span>
                    <MdRestaurantMenu /> COURSE <b>{recipe.course}</b>
                </span>
                <span>
                    <MdRestaurantMenu /> CUISINE <b>{recipe.cuisine}</b>
                </span>
                <span>
                    <MdRestaurantMenu /> DIET <b>{recipe.diet}</b>
                </span>
            </div>
            <p className={classes.recipeDescription}>
                {isUpperCase(recipe.description.substr(0, 1))
                    ? recipe.description
                    : recipe.recipeTitle + " " + recipe.description}{" "}
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                    {"..View More "}
                    <BsBoxArrowUpRight />
                </a>
            </p>
            <div className={classes.ingredientsContainer}>
                <h2>Ingredients</h2>
                {recipe.ingredients.map((ingredient, index) => (
                    <span key={index}>{ingredient.ingredient}</span>
                ))}
            </div>
            <div className={classes.instructionsContainer}>
                <h2>Directions</h2>
                {directionsFinal.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </div>
        </div>
    );
};

export default RecipePage;

import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import classes from "./AdvancedSearch.module.css";
import SearchIcon from "./../assets/images/search_icon.svg";
import RemoveIcon from "./../assets/images/remove_icon.svg";
import AddIcon from "./../assets/images/add_icon.svg";
import CrossIcon from "./../assets/images/cross.svg";
import RecipeList from "./RecipeList";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import * as constants from "./../constants";

const IngredientsBox = (props) => {
    const [showIngredientInputs, setShowIngredientInputs] = useState(false);
    const [includeIngredient, setIncludeIngredient] = useState("");
    const [excludeIngredient, setExcludeIngredient] = useState("");

    const showIngredientsHandler = () => {
        setShowIngredientInputs(true);
    };

    const includeIngredientChangeHandler = (e) => {
        setIncludeIngredient(e.target.value);
    };

    const excludeIngredientChangeHandler = (e) => {
        setExcludeIngredient(e.target.value);
    };

    const includeIngredientSubmitHandler = () => {
        props.onIncludeIngredientsChange(includeIngredient);
        setIncludeIngredient("");
    };

    const excludeIngredientSubmitHandler = () => {
        props.onExcludeIngredientsChange(excludeIngredient);
        setExcludeIngredient("");
    };

    return (
        <>
            {showIngredientInputs ? (
                <div className={classes.showIngredientsContainer}>
                    <div className={classes.inputBox}>
                        <input
                            type="text"
                            placeholder="Include Ingredients"
                            value={includeIngredient}
                            onChange={includeIngredientChangeHandler}
                        />
                        <img
                            src={AddIcon}
                            alt="Add Ingredient"
                            onClick={includeIngredientSubmitHandler}
                        />
                    </div>
                    <div className={classes.inputBox}>
                        <input
                            type="text"
                            placeholder="Exclude Ingredients"
                            value={excludeIngredient}
                            onChange={excludeIngredientChangeHandler}
                        />
                        <img
                            src={RemoveIcon}
                            alt="Remove Ingredient"
                            onClick={excludeIngredientSubmitHandler}
                        />
                    </div>
                </div>
            ) : (
                <div className={classes.hideIngredientsContainer}>
                    <p onClick={showIngredientsHandler}>
                        INCLUDE/EXCLUDE INGREDIENTS
                    </p>
                </div>
            )}
        </>
    );
};

const AdvancedSearch = () => {
    const history = useHistory();
    const location = useLocation();
    const [searchString, setSearchString] = useState(
        location.state.searchString
    );
    const [searchCriteria, setSearchCriteria] = useState({
        keyword: location.state.searchString,
        includedIngredients: [],
        excludedIngredients: [],
        categories: [],
        courses: [],
        cuisines: [],
        diets: [],
        tags: [],
    });
    const [includedIngredientsRaw, setIncludedIngredientsRaw] = useState([]);
    const [excludedIngredientsRaw, setExcludedIngredientsRaw] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    const [areCoursesChecked, setAreCoursesChecked] = useState(
        constants.INITIAL_COURSES_CHECKED
    );
    const [areDietsChecked, setAreDietsChecked] = useState(
        constants.INITIAL_DIETS_CHECKED
    );
    const [areCuisinesChecked, setAreCuisinesChecked] = useState(
        constants.INITIAL_CUISINES_CHECKED
    );
    const [overflow, setOverflow] = useState("auto");
    const [position, setPosition] = useState("anchor");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchCriteria((prevSearchCriteria) => ({
                ...prevSearchCriteria,
                keyword: searchString,
            }));
        }, 500);
        window.history.replaceState(
            {
                key: location.key,
                state: { searchString: searchString },
            },
            ""
        );
        return () => {
            clearTimeout(timeout);
        };
    }, [searchString]);

    useEffect(() => {
        const selectedCourses = [];
        for (let course in areCoursesChecked) {
            if (areCoursesChecked[course]) {
                selectedCourses.push(course);
            }
        }
        setSearchCriteria((prevSearchCriteria) => ({
            ...prevSearchCriteria,
            courses: selectedCourses,
        }));
    }, [areCoursesChecked]);

    useEffect(() => {
        const selectedDiets = [];
        for (let diet in areDietsChecked) {
            if (areDietsChecked[diet]) {
                selectedDiets.push(diet);
            }
        }
        setSearchCriteria((prevSearchCriteria) => ({
            ...prevSearchCriteria,
            diets: selectedDiets,
        }));
    }, [areDietsChecked]);

    useEffect(() => {
        const selectedCuisines = [];
        for (let cuisine in areCuisinesChecked) {
            if (areCuisinesChecked[cuisine]) {
                selectedCuisines.push(cuisine);
            }
        }
        setSearchCriteria((prevSearchCriteria) => ({
            ...prevSearchCriteria,
            cuisines: selectedCuisines,
        }));
    }, [areCuisinesChecked]);

    useEffect(() => {
        fetchRecipe();
    }, [searchCriteria]);

    const searchStringChangeHandler = (e) => {
        const updatedSearchString = e.target.value;
        setSearchString(updatedSearchString);
    };

    const fetchRecipe = async () => {
        const response = await axios.post(
            "http://localhost:8080/api/recipe/search",
            searchCriteria
        );
        setRecipeList(response.data);
    };

    const onIncludeIngredientsChange = async (ingredientSearchString) => {
        setIncludedIngredientsRaw((prev) => [...prev, ingredientSearchString]);
        const response = await axios.get(
            `http://localhost:8080/api/ingredient/getSimilarIngredients/${ingredientSearchString}`
        );
        const similarIngredients = response.data;
        const includedIngredients = searchCriteria.includedIngredients;
        for (let ingredient in similarIngredients) {
            includedIngredients.push(similarIngredients[ingredient].ingredient);
        }
        setSearchCriteria({
            ...searchCriteria,
            includedIngredients: includedIngredients,
        });
    };

    const onExcludeIngredientsChange = async (ingredientSearchString) => {
        setExcludedIngredientsRaw((prev) => [...prev, ingredientSearchString]);
        const response = await axios.get(
            `http://localhost:8080/api/ingredient/getSimilarIngredients/${ingredientSearchString}`
        );
        const similarIngredients = response.data;
        const excludedIngredients = searchCriteria.excludedIngredients;
        for (let ingredient in similarIngredients) {
            excludedIngredients.push(similarIngredients[ingredient].ingredient);
        }
        setSearchCriteria({
            ...searchCriteria,
            excludedIngredients: excludedIngredients,
        });
    };

    const removeIncludedIngredientHandler = async (ingredientSearchString) => {
        console.log("Called");
        setIncludedIngredientsRaw((prev) =>
            prev.filter((item) => item !== ingredientSearchString)
        );
        const response = await axios.get(
            `http://localhost:8080/api/ingredient/getSimilarIngredients/${ingredientSearchString}`
        );
        const similarIngredients = response.data;
        let includedIngredients = searchCriteria.includedIngredients;
        for (let ingredient in similarIngredients) {
            const index = includedIngredients.indexOf(
                similarIngredients[ingredient].ingredient
            );
            if (index > -1) {
                includedIngredients.splice(index, 1);
            }
        }
        setSearchCriteria({
            ...searchCriteria,
            includedIngredients: includedIngredients,
        });
    };

    const removeExcludedIngredientHandler = async (ingredientSearchString) => {
        setExcludedIngredientsRaw((prev) =>
            prev.filter((item) => item !== ingredientSearchString)
        );
        const response = await axios.get(
            `http://localhost:8080/api/ingredient/getSimilarIngredients/${ingredientSearchString}`
        );
        const similarIngredients = response.data;
        const excludedIngredients = searchCriteria.excludedIngredients;
        for (let ingredient in similarIngredients) {
            const index = excludedIngredients.indexOf(
                similarIngredients[ingredient].ingredient
            );
            if (index > -1) {
                excludedIngredients.splice(index, 1);
            }
        }
        setSearchCriteria({
            ...searchCriteria,
            excludedIngredients: excludedIngredients,
        });
    };

    const onCoursesCheckHandler = (e, entry) => {
        const updatedCoursesChecked = { ...areCoursesChecked };
        updatedCoursesChecked[entry] = e.checked;
        setAreCoursesChecked(updatedCoursesChecked);
    };

    const onDietsCheckHandler = (e, entry) => {
        const updatedDietsChecked = { ...areDietsChecked };
        updatedDietsChecked[entry] = e.checked;
        setAreDietsChecked(updatedDietsChecked);
    };

    const onCuisinesCheckHandler = (e, entry) => {
        const updatedCuisinesChecked = { ...areCuisinesChecked };
        updatedCuisinesChecked[entry] = e.checked;
        setAreCuisinesChecked(updatedCuisinesChecked);
    };

    return (
        <div>
            <div className={classes.filterBox}>
                <div className={classes.filterBoxHeader}>
                    <div className={classes.inputBox}>
                        <img src={SearchIcon} alt="Search recipe" />
                        <input
                            type="text"
                            placeholder="Find a Recipe"
                            value={searchString}
                            onChange={searchStringChangeHandler}
                        />
                    </div>
                    <IngredientsBox
                        onIncludeIngredientsChange={onIncludeIngredientsChange}
                        onExcludeIngredientsChange={onExcludeIngredientsChange}
                    />
                </div>
                <div className={classes.advancedFiltersBox}>
                    <Menu menuButton={<button>COURSE</button>}>
                        {constants.COURSE_LIST.map((entry) => (
                            <MenuItem
                                type="checkbox"
                                key={entry}
                                checked={areCoursesChecked[entry]}
                                onClick={(e) =>
                                    onCoursesCheckHandler(e, entry)
                                }>
                                {entry}
                            </MenuItem>
                        ))}
                    </Menu>
                    <Menu menuButton={<button>DIET</button>}>
                        {constants.DIET_LIST.map((entry) => (
                            <MenuItem
                                type="checkbox"
                                key={entry}
                                checked={areDietsChecked[entry]}
                                onClick={(e) => onDietsCheckHandler(e, entry)}>
                                {entry}
                            </MenuItem>
                        ))}
                    </Menu>
                    <Menu
                        menuButton={<button>CUISINE</button>}
                        overflow={overflow}
                        position={position}>
                        {constants.CUISINE_LIST.map((entry) => (
                            <MenuItem
                                type="checkbox"
                                key={entry}
                                checked={areCuisinesChecked[entry]}
                                onClick={(e) =>
                                    onCuisinesCheckHandler(e, entry)
                                }>
                                {entry}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </div>
            <p className={classes.matchingResults}>
                {recipeList.length} matching results for "
                <i>{searchCriteria.keyword}</i>"
            </p>
            <div className={classes.ingredientFilters}>
                {includedIngredientsRaw.map((ingredient) => (
                    <span
                        key={ingredient}
                        className={classes.includedIngredient}>
                        {ingredient}{" "}
                        <img
                            src={CrossIcon}
                            alt="Remove"
                            onClick={(e) =>
                                removeIncludedIngredientHandler(ingredient)
                            }
                        />
                    </span>
                ))}
                {excludedIngredientsRaw.map((ingredient) => (
                    <span
                        key={ingredient}
                        className={classes.excludedIngredient}>
                        {ingredient}{" "}
                        <img
                            src={CrossIcon}
                            alt="Remove"
                            onClick={(e) =>
                                removeExcludedIngredientHandler(ingredient)
                            }
                        />
                    </span>
                ))}
            </div>
            <RecipeList recipeList={recipeList} />
        </div>
    );
};

export default AdvancedSearch;

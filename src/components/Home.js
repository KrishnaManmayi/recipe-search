import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Home.module.css";
import CookingImage from "./../assets/images/undraw_cooking.svg";
import SearchIcon from "./../assets/images/search_icon.svg";

const Home = () => {
    const history = useHistory();
    const searchInputRef = useRef();

    const searchInputSubmitHandler = () => {
        const searchString = searchInputRef.current.value;
        history.push({
            pathname: "/advancedSearch",
            state: { searchString: searchString },
        });
    };

    return (
        <div className={classes.homeContainer}>
            <div className={classes.imageContainer}>
                <img src={CookingImage} alt="Cooking" />
            </div>
            <div className={classes.searchContainer}>
                <div className={classes.Card}>
                    <div className={classes.CardInner}>
                        <label>Search for your favourite food</label>
                        <div className={classes.container}>
                            <div class={classes.InputContainer}>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="It just can't be pizza..."
                                />
                            </div>
                            <div
                                className={classes.Icon}
                                onClick={searchInputSubmitHandler}>
                                <img src={SearchIcon} alt="Search Icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

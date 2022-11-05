import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
    const history = useHistory();
    const onHeaderClick = () => {
        history.replace("/");
    };

    return (
        <div onClick={onHeaderClick} className={classes.header}>
            recipe<span>Quest</span>
        </div>
    );
};

export default Header;

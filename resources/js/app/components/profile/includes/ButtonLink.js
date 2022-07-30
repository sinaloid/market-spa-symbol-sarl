import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({url, name, className = ""}) => {
    return (
        <Link
            type="button"
            className={"btn btn-sm btn-afdefis "+className}
            to={url}
        >
            {name}
        </Link>
    );
};

export default ButtonLink;

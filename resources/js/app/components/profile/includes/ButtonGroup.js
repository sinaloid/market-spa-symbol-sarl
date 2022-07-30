import React from "react";
import { Link } from "react-router-dom";
import url from "../../../url";

const ButtonGroup = ({children}) => {
    return (
        <div className="col-4">
            <div
                className="btn-group btn-group-sm"
                role="group"
                aria-label="Small button group"
            >
               {
                   children
               }
            </div>
        </div>
    );
};

export default ButtonGroup;

import React from "react";
import { Link } from "react-router-dom";

const ButtonAction = ({onDelete,slug, dataEdite, setDataEdite}) => {
    
    return (
        <>
            <Link to="#" className="text-success mx-2" onClick={()=>{setDataEdite(dataEdite)}}>
                <i 
                    className="fa-solid fa-pen fa-sm" 
                    data-bs-toggle="modal"
                    data-bs-target="#edit"></i>
            </Link>
            <Link to="#" className="text-danger mx-2" onClick={()=>{onDelete(slug)}}>
                <i className="fa-solid fa-trash" ></i>
            </Link>
        </>
    );
};

export default ButtonAction;

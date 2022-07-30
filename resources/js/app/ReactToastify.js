import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (type, msg) => {
    if(type === "success"){
        toast.success(msg);
    }
    if(type ==="error" ){
        toast.error(msg);
    }
    

    /*toast.warn("Warning Notification !", {
      position: toast.POSITION.BOTTOM_LEFT
    });

    toast.info("Info Notification !", {
      position: toast.POSITION.BOTTOM_CENTER
    });

    toast("Custom Style Notification with css class!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'foo-bar'
    });*/
  };
const ReactToastify = () => {
    
    return(
        <ToastContainer autoClose={2000} />
    )
}

export default ReactToastify;
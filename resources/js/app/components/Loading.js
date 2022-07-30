import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => {
    return (
        <Spinner className="bg-primary" type="grow">
            loading...
        </Spinner>
    );
};

export default Loading;

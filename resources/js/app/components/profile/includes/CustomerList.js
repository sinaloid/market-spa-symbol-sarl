import faker from "@faker-js/faker";
import React from "react";
import CustomerTable from "./CustomerTable";

const CustomerListe = () => {
    return (
        <>
            <div className="container mt-3 d-flex position-relative">
                <h2 className="mt-2">Liste</h2>
            </div>
            <div className="card shadow-sm table-responsive">
                <CustomerTable clientType={"clientVendeur"} />
            </div>
        </>
    );
};

export default CustomerListe;

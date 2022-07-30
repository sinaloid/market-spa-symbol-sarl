import faker from "@faker-js/faker";
import React from "react";
import ButtonAction from "./ButtonAction";

const PayTable = () => {
  return (
    <table className="table text-center text-nowrap" id="user_table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Client</th>
          <th scope="col">N° Commande</th>
          <th scope="col">Montant</th>
          <th scope="col">date</th>
          <th scope="col">Type de paiement</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          /**
           * <tr>
          <th scope="row">1</th>
          <td>Smith Doe</td>
          <td>
            #{
                faker.datatype.string()
            }
          </td>
          <td>{faker.datatype.number({ min: 0, max: 100000 })} fcfa</td>
          <td>12/04/2022</td>
          <td>
            <span className="badge bg-success">Moov Money</span>
          </td>
          <td>
            <ButtonAction />

          </td>
        </tr>
           */
        }
        
      </tbody>
    </table>
  );
};

export default PayTable;

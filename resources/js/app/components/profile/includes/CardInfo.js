import React from "react";

const CardInfo = ({icon, title, data }) => {

    return (
        <div className="col">
          <div className="card shadow-sm mb-4">
            <div className="card-body text-center d-flex">
              {icon}
              <div className="col">
                <p className="text-muted mt-2 mb-0">{title}</p>
                <p className="mb-2 text-bold">{data}</p>
              </div>
            </div>
          </div>
        </div>
    )
}

export default CardInfo;
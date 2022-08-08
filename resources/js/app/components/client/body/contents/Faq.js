import React, { useEffect, useState } from "react";
import apiClient from "../../../../services/api";
import Carousel from "../Carousel";

const Faq = () => {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        apiClient
            .get(`faqAll`)
            .then((res) => {
                if (res.status === 200) {
                    setDatas(res.data.response);
                    //console.log(res.data.response);
                } else {
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    //notify("error", error.response.data.message);
                } else {
                    //notify("error", error.response.data.message);
                }
            });
    }, []);
    return (
        <main>
            <Carousel />
            <h2 className="mb-3 title-1">QUESTIONS GÉNÉRALES</h2>
            <div className="accordion" id="accordionMarket">
                {datas.map((data, index) => {
                    return (
                        <div key={index} className="accordion-item mt-4">
                            <h2
                                className="accordion-header "
                                id={"faq" + index}
                            >
                                <button
                                    className={ (index == 0) ? "accordion-button": "accordion-button collapsed"}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={"#collapse" + index}
                                    aria-expanded="false"
                                    aria-controls={"collapse" + index}
                                >
                                    {data.question}
                                </button>
                            </h2>
                            <div
                                id={"collapse" + index}
                                className={(index == 0) ? "accordion-collapse collapse show":"accordion-collapse collapse"}
                                aria-labelledby={"faq" + index}
                                data-bs-parent="#accordionMarket"
                            >
                                <div className="accordion-body">
                                    {data.response}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
};

export default Faq;

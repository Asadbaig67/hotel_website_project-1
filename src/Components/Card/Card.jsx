import React from "react";
import style from "./Card1.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Card = () => {
  // const dispatch = useDispatch();
  const { cardData } = useSelector((state) => state.setCardData);

  // const [card, setCard] = useState({
  //   name: "",
  //   rating: "",
  //   attr1: "",
  //   attr2: "",
  //   attr3: "",
  //   attr4: "",
  //   attr5: "",
  //   attr6: "",
  //   price: "",
  //   previousPrice: "",
  //   description: "",
  // });

  // const handleChange = (e) => {
  //   const value = e.target.value;

  //   setCard({ ...card, [e.target.name]: value });
  // };
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   dispatch({
  //     type: "setCard",
  //     payload: card,
  //   });
  //   setTimeout(() => {
  //     console.log(cardData);
  //   }, 5000);
  // };

  return (
    <section style={{ backgroundColor: "#000" }}>
      <div className="container py-5">
        <div className="row justify-content-center mb-3">
          <div className="col-md-12 col-xl-10">
            <div className="card shadow-0 border rounded-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp"
                        className="w-100"
                      />
                      <a href="#!">
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(253, 253, 253, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6">
                    <h5>{cardData.name}</h5>
                    <div className="d-flex flex-row">
                      <div className="text-danger mb-1 me-2">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <span>{cardData.rating}</span>
                    </div>
                    <div className="mt-1 mb-0 text-muted small">
                      <span>{cardData.attr1}</span>
                      <span className="text-primary"> • </span>
                      <span>{cardData.attr2}</span>
                      <span className="text-primary"> • </span>
                      <span>
                        {cardData.attr3}
                        <br />
                      </span>
                    </div>
                    <div className="mb-2 text-muted small">
                      <span>{cardData.attr4}</span>
                      <span className="text-primary"> • </span>
                      <span>{cardData.attr5}</span>
                      <span className="text-primary"> • </span>
                      <span>
                        {cardData.attr6}
                        <br />
                      </span>
                    </div>
                    <p className="text-truncate mb-4 mb-md-0">
                      {cardData.description}
                    </p>
                  </div>
                  <div
                    className={`col-md-6 col-lg-3 col-xl-3 ${style.border_sm_start_none} border-start`}
                  >
                    <div className="d-flex flex-row align-items-center mb-1">
                      <h4 className="mb-1 me-1">{cardData.price}</h4>
                      <span className="text-danger">
                        <s>{cardData.previousPrice}</s>
                      </span>
                    </div>
                    <h6 className="text-success">Staring From</h6>
                    <div className="d-flex flex-column mt-4">
                      <button
                        className="btn btn-primary btn-sm text-uppercase"
                        type="button"
                      >
                        Details
                      </button>
                      <button
                        className="btn btn-outline-primary btn-sm mt-2"
                        type="button"
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row justify-content-center mb-3">
          <div className="col-md-12 col-xl-10">
            <div className="card shadow-0 border rounded-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp"
                        className="w-100"
                      />
                      <a href="#!">
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(253, 253, 253, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6">
                    <h5>PTDC Hotels</h5>
                    <div className="d-flex flex-row">
                      <div className="text-danger mb-1 me-2">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <span>289</span>
                    </div>
                    <div className="mt-1 mb-0 text-muted small">
                      <span>100% cotton</span>
                      <span className="text-primary"> • </span>
                      <span>Light weight</span>
                      <span className="text-primary"> • </span>
                      <span>
                        Best finish
                        <br />
                      </span>
                    </div>
                    <div className="mb-2 text-muted small">
                      <span>Unique design</span>
                      <span className="text-primary"> • </span>
                      <span>For men</span>
                      <span className="text-primary"> • </span>
                      <span>
                        Casual
                        <br />
                      </span>
                    </div>
                    <p className="text-truncate mb-4 mb-md-0">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                    <div className="d-flex flex-row align-items-center mb-1">
                      <h4 className="mb-1 me-1">$14.99</h4>
                      <span className="text-danger">
                        <s>$21.99</s>
                      </span>
                    </div>
                    <h6 className="text-success">Free shipping</h6>
                    <div className="d-flex flex-column mt-4">
                      <button
                        className="btn btn-primary btn-sm text-uppercase"
                        type="button"
                      >
                        Details
                      </button>
                      <button
                        className="btn btn-outline-primary btn-sm mt-2"
                        type="button"
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12 col-xl-10">
            <div className="card shadow-0 border rounded-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(5).webp"
                        className="w-100"
                      />
                      <a href="#!">
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(253, 253, 253, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6">
                    <h5>Burj Khalifa</h5>
                    <div className="d-flex flex-row">
                      <div className="text-danger mb-1 me-2">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <span>145</span>
                    </div>
                    <div className="mt-1 mb-0 text-muted small">
                      <span>100% cotton</span>
                      <span className="text-primary"> • </span>
                      <span>Light weight</span>
                      <span className="text-primary"> • </span>
                      <span>
                        Best finish
                        <br />
                      </span>
                    </div>
                    <div className="mb-2 text-muted small">
                      <span>Unique design</span>
                      <span className="text-primary"> • </span>
                      <span>For women</span>
                      <span className="text-primary"> • </span>
                      <span>
                        Casual
                        <br />
                      </span>
                    </div>
                    <p className="text-truncate mb-4 mb-md-0">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                    <div className="d-flex flex-row align-items-center mb-1">
                      <h4 className="mb-1 me-1">$17.99</h4>
                      <span className="text-danger">
                        <s>$25.99</s>
                      </span>
                    </div>
                    <h6 className="text-success">Free shipping</h6>
                    <div className="d-flex flex-column mt-4">
                      <button
                        className="btn btn-primary btn-sm text-uppercase"
                        type="button"
                      >
                        Details
                      </button>
                      <button
                        className="btn btn-outline-primary btn-sm mt-2"
                        type="button"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Card;

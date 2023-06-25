import React from "react";
import img from "../../images/2953962.jpg";

const PageNotFound = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div style={{ height: "300px", width: "300px", position: "relative" }}>
          <img src={img} style={{ objectFit: "cover" }} alt="" />
          <h3 className="text-primary  text-center mt-3 d-block fs-3 fw-bold">
            No Hotels Found
          </h3>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;

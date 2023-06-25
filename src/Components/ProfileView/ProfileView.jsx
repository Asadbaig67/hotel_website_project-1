import React from "react";
import { useSelector } from "react-redux";

const ProfileView = ({ profile }) => {
  const { mode } = useSelector((state) => state.mode);
  const { user } = profile;
  return (
    <div className="mx-4 pb-4">
      <div className="row mt-2">
        <div className="col-md-6">
          <label
            className={`fw-semibold labels text-${
              mode === "light" ? "dark" : "light"
            }`}
          >
            Name
          </label>
          <div className="border-bottom mb-2">
            <p className="mb-1 mt-2">{user.firstName}</p>
          </div>
        </div>
        <div className="col-md-6">
          <label
            className={`fw-semibold labels text-${
              mode === "light" ? "dark" : "light"
            }`}
          >
            Surname
          </label>
          <div className="border-bottom mb-2">
            <p className="mb-1 mt-2">{user.lastName}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-2">
          <label
            className={`fw-semibold labels text-${
              mode === "light" ? "dark" : "light"
            }`}
          >
            Mobile Number
          </label>
          <div className="border-bottom mb-2">
            <p className="mb-1 mt-2">{user.mobile}</p>
          </div>
        </div>
      
        <div className="col-md-12 mt-2">
          <label
            className={`fw-semibold labels text-${
              mode === "light" ? "dark" : "light"
            }`}
          >
            Email ID
          </label>
          <div className="border-bottom mb-2">
            <p className="mb-1 mt-2">{user.email}</p>
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default ProfileView;

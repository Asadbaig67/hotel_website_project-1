import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import userImg from "../../images/user.png";
import ProfileView from "../../Components/ProfileView/ProfileView";
import EditProfile from "../../Components/EditProfile/EditProfile";
import ChangePassword from "../../Components/changePassword/changePassword";
import { useMediaQuery } from "@mui/material";
import Sidebar from "../../Components/Sidebar/SideBar";
import AdminNav from "../../Components/AdminNavbar/AdminNav";

export default function Profile() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);
  const [profile, viewProfile] = useState(true);
  const [editProfile, viewEditProfile] = useState(false);
  const [changePassword, viewChangePassword] = useState(false);
  const isMobile = useMediaQuery("(max-width: 450px)");
  const isXtraSmall = useMediaQuery("(max-width: 300px)");
  const IsMedium = useMediaQuery("(max-width:1000px)");

  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;
  const IsLargee = useMediaQuery("(max-width:1400px)");
  const IsMediumm = useMediaQuery("(max-width:1000px)");
  const IsSmalll = useMediaQuery("(max-width:768px)");
  const IsMobilee = useMediaQuery("(max-width:450px)");

  return (
    <>
      <div>
        <AdminNav />
      </div>
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid mt-5" style={{ marginTop: "50px" }}>
          <div
            className={`rounded ${mode === "dark" ? "bg-dark" : style.bg}`}
          ></div>
          <div className="row">
            <div
              className="col-md-12 p-3 d-flex "
              // style={{ marginLeft: "10px" }}
            >
              <h1 className={`fs-1 fw-bold ${style.heading} mx-auto `}>
                Profile
              </h1>
            </div>

            <div className="col-md-4 col-sm-12">
              <div
                className={`${
                  mode === "light" ? "bg-white" : "bg-dark"
                } d-flex flex-column align-items-center text-center w-75 mx-auto mt-3 pb-5 rounded-3`}
              >
                <img
                  style={{ width: "35%" }}
                  className="mt-5 rounded-circle"
                  src={user.photo ? user.photo : userImg}
                  alt=""
                />
                <h2
                  className={`fw-semibold my-2 text-${
                    mode === "light" ? "dark" : "light"
                  }`}
                >
                  {user.firstName + " " + user.lastName}
                </h2>
                <span
                  className={`text-${
                    mode === "light" ? "black-50" : "white-50"
                  }`}
                >
                  {user.account_type}
                </span>
              </div>
            </div>

            <div className="col-md-8 mb-5">
              <div
                className={`pt-2 mt-3 ${
                  mode === "light" ? "bg-white" : "bg-dark"
                } rounded-3 me-2`}
              >
                <div className="row text-center m-1 mt-4">
                  <div className="col-md-3 col-lg-3 col-4">
                    <p
                      className={`${style.portion} ${
                        isXtraSmall ? "fw-bold small" : "fs-5"
                      }`}
                      // style={isXtraSmall && { fontSize: "14px" }}
                      onClick={() => {
                        viewProfile(true);
                        viewEditProfile(false);
                        viewChangePassword(false);
                      }}
                    >
                      Overview {isMobile && "Profile"}
                    </p>
                    {profile && (
                      <hr className={`${style.hr} mt-2 mb-0 text-primary`} />
                    )}
                  </div>
                  <div className="col-md-4 col-lg-3 col-4">
                    <p
                      className={`${style.portion} ${
                        isXtraSmall ? "fw-bold small" : "fs-5"
                      } `}
                      // style={isXtraSmall && { fontSize: "14px" }}
                      onClick={() => {
                        viewProfile(false);
                        viewEditProfile(true);
                        viewChangePassword(false);
                      }}
                    >
                      Edit Profile
                    </p>
                    {editProfile && (
                      <hr className={`${style.hr} mt-2 mb-0 text-primary`} />
                    )}
                  </div>
                  <div className="col-md-5 col-lg-3 col-4">
                    <p
                      className={`${style.portion} ${
                        isXtraSmall ? "fw-bold small" : "fs-5"
                      }`}
                      // style={isXtraSmall && { fontSize: "14px" }}
                      onClick={() => {
                        viewProfile(false);
                        viewEditProfile(false);
                        viewChangePassword(true);
                      }}
                    >
                      Change Password
                    </p>
                    {changePassword && (
                      <hr className={`${style.hr} mt-2 mb-0 text-primary`} />
                    )}
                  </div>

                  <div className="col-md-12">
                    <hr className="mt-0" />
                  </div>
                </div>
                {profile ? (
                  <ProfileView profile={loggedinUser} />
                ) : editProfile ? (
                  <EditProfile profile={loggedinUser} />
                ) : changePassword ? (
                  <ChangePassword profile={loggedinUser} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

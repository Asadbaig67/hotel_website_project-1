import React from "react";
import "./navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/white-logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import bgrmvblk from "../../images/bgrmvblk.png";

export default function Navbar() {
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;

  return (
    <>
      <nav
        className={`sticky-top w-100 navbar navbar-expand-lg bg-${mode} text-${
          mode === "light" ? "dark" : "light"
        }`}
        id="navbar"
      >
        <div className="container-fluid">
          <Link
            className={`navbar-brand fs-2 mx-3 text-${
              mode === "light" ? "dark" : "light"
            }`}
            to="/dashboard"
          >
            <img
              alt="logo"
              style={{ width: "15%", height: "15%" }}
              src={bgrmvblk}
            />
          </Link>
        </div>

        <div
          style={{ width: "35%" }}
          className="d-flex align-items-center justify-content-around"
        >
          <div>
            <li className="nav-item dropdown d-flex align-items-center">
              <a
                className="nav-link dropdown-toggle w-50"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={logo}
                  style={{ width: "40px", height: "40px" }}
                  className="rounded-circle border border-2 me-1"
                  alt="..."
                />
                <span style={{ fontSize: "12px" }}>{user.firstName}</span>
              </a>
              <ul className={`dropdown-menu bg-${mode}`}>
                <li>
                  <Link
                    className={`dropdown-item text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                    to={`/profile`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                    to={`/profile`}
                  >
                    Account settings
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className={`dropdown-item text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                    onClick={() => {
                      navigate("/signin");
                      localStorage.clear();
                      dispatch({ type: "SET_LOGGEDIN_USER", payload: {} });
                    }}
                  >
                    Log out
                  </a>
                </li>
              </ul>
            </li>
          </div>
          {/* <div className="form-check form-switch w-50">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onClick={() =>
                dispatch({
                  type: "MODE",
                  payload: mode === "light" ? "dark" : "light",
                })
              }
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Dark mode
            </label>
          </div> */}
        </div>
      </nav>
    </>
  );
}

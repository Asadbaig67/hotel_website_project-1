import React from "react";
import "./navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/white-logo.png";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();

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
            to="/"
          >
            Navbar
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
                <span style={{ fontSize: "12px" }}>Username</span>
              </a>
              <ul className={`dropdown-menu bg-${mode}`}>
                <li>
                  <a
                    className={`dropdown-item text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                    href="#"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    className={`dropdown-item text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                    href="#"
                  >
                    Account settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className={`dropdown-item text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                    href="#"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </li>
          </div>
          <div className="form-check form-switch w-50">
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
          </div>
        </div>
      </nav>
    </>
  );
}

import React from "react";

const AdminNav = () => {
  return (
    <nav
      class="navbar navbar-expand-lg bg-body-tertiary"
      style={{
        zIndex: "4",
        position: "fixed",
        marginLeft: "45px",
        top: "0",
        left: "0",
        right: "0",
        backgroundColor: "#00073d",
      }}
    >
      <div class="container-fluid">
        <a class="navbar-brand fs-3 p-0 mx-auto text-light" style={{ fontFamily: "sans-serif" }}>
          Desalis
        </a>
        <button
          class="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;

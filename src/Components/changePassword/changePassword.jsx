import React from "react";

const changePassword = () => {
  return (
    <div>
      <form className="mb-4 mx-4">
        <div className="row mb-3">
          <label for="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword3" />
          </div>
        </div>
        
        <div className="row mb-3">
          <label for="inputPassword4" className="col-sm-2 col-form-label">
            New Password
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword4" />
          </div>
        </div>
        
        <div className="row mb-3">
          <label for="inputPassword5" className="col-sm-2 col-form-label">
            Confirm New Password
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword5" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mb-4">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default changePassword;

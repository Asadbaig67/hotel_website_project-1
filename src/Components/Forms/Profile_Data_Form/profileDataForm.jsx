import React from "react";
import style from "./profileDataForm.module.css";

const ProfileDataForm = () => {
  return (
    <div className={style.custom_container}>
      <h1>Custom Form</h1>
      <form>
        <div className={style.form_group}>
          <label for="image">Image:</label>
          <input
            type="text"
            className={style.form_control}
            id="image"
            value="img"
          />
        </div>
        <div className={style.form_row}>
          <div className="form-group col-md-6">
            <label for="name">Name:</label>
            <input
              type="text"
              className={style.form_control}
              id="name"
              value="Name Here"
            />
          </div>
          <div className="form-group col-md-6">
            <label for="surname">Surname:</label>
            <input
              type="text"
              className={style.form_control}
              id="surname"
              value="Surname Here"
            />
          </div>
        </div>
        <div className={style.form_group}>
          <label for="mobile">Mobile:</label>
          <input
            type="text"
            className={style.form_control}
            id="mobile"
            value="XXXX-XXXXXXX"
          />
        </div>
        <div className={style.form_group}>
          <label for="addressLine1">Address Line 1:</label>
          <input
            type="text"
            className={style.form_control}
            id="addressLine1"
            value="Address line 1 here"
          />
        </div>
        <div className={style.form_group}>
          <label for="addressLine2">Address Line 2:</label>
          <input
            type="text"
            className={style.form_control}
            id="addressLine2"
            value="Address line 2 here"
          />
        </div>
        <div className={style.form_row}>
          <div className="form-group col-md-4">
            <label for="postalCode">Postal Code:</label>
            <input
              type="text"
              className={style.form_control}
              id="postalCode"
              value="Code"
            />
          </div>
          <div className="form-group col-md-4">
            <label for="state">State:</label>
            <input
              type="text"
              className={style.form_control}
              id="state"
              value="State"
            />
          </div>
          <div className="form-group col-md-4">
            <label for="area">Area:</label>
            <input
              type="text"
              className={style.form_control}
              id="area"
              value="Area"
            />
          </div>
        </div>
        <div className={style.form_group}>
          <label for="email">Email:</label>
          <input
            type="email"
            className={style.form_control}
            id="email"
            value="Email"
          />
        </div>
        <div className={style.form_group}>
          <label for="education">Education:</label>
          <select className={style.form_control} id="education">
            <option value="bachelors">Bachelor's</option>
            <option value="masters">Master's</option>
            <option value="doctorate">Doctorate</option>
          </select>
        </div>
        <div className={style.form_row}>
          <div className="form-group col-md-6">
            <label for="country">Country:</label>
            <input
              type="text"
              className={style.form_control}
              id="country"
              value="Pakistan"
            />
          </div>
          <div className="form-group col-md-6">
            <label for="city">City:</label>
            <input
              type="text"
              className={style.form_control}
              id="city"
              value="City Name"
            />
          </div>
        </div>
        <div className={style.form_row}>
          <div className="form-group col-md-6">
            <label for="state">State/Province:</label>
            <input
              type="text"
              className={style.form_control}
              id="state"
              value="State/Province Name"
            />
          </div>
          <div className="form-group col-md-6">
            <label for="zip">Zip/Postal Code:</label>
            <input
              type="text"
              className={style.form_control}
              id="zip"
              value="Zip/Postal Code"
            />
          </div>
        </div>
        <button type="submit" className={`${style.btn} btn-primary`}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileDataForm;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./ImageUpload.css";

const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img htmlFor="photo-upload" src={src} alt="" />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);

const ImageUpload = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
  );
  
  const [active, setActive] = useState("edit");

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    dispatch({ type: "SET_PROFILE_IMAGE", payload: file });
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };


  return (
    <div>
      {active === "edit" ? (
        <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
      ) : null}
    </div>
  );
};

export default ImageUpload;

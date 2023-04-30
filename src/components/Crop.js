import React, { useState } from "react";

function Crop({ file, x, y, width, height }) {
  const [croppedImage, setCroppedImage] = useState("");

  const handleSubmit = async (event) => {
    console.log(x, y, width, height);
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("x", x);
    formData.append("y", y);
    formData.append("width", width);
    formData.append("height", height);

    try {
      const response = await fetch("http://localhost:5000/crop", {
        method: "POST",
        body: formData,

      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setCroppedImage(url);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error occurred while cropping image:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <img className="img-fluid" id="crop" src={croppedImage || ""} />
    </div>
    <div className="mb-3">
    <button className="btn btn-primary" type="submit">Kırp</button>
    </div>
    </form>
    );
    }
    
    export default Crop;
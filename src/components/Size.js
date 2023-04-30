import React, { useState } from "react";

function Size({ file, width, height }) {
  const [resultImgSrc, setResultImgSrc] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sizewidth", width);
    formData.append("sizeheight", height);

    try {
      const response = await fetch("http://localhost:5000/size", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResultImgSrc(url);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error occurred while resizing image:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <img id="size" className="img-fluid" src={resultImgSrc || ""} />
      </div>
      <button className="btn btn-primary" type="submit">
        Boyutlandır
      </button>
    </form>
  );
}

export default Size;

import React, { useState, useRef, useEffect } from "react";

function Rotate({ file }) {
  const [rotatedImage, setRotatedImage] = useState("");
  const [isClick, setClicked] = useState(false);

  const canvasRef = useRef();
  const [angle, setAngle] = useState("0");

  useEffect(() => {
    if (rotatedImage && angle) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = rotatedImage;
      img.onload = () => {
        canvas.width = 350;
        canvas.height = (img.height / img.width) * 350;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle * (Math.PI / 180));
        ctx.drawImage(
          img,
          -canvas.width / 2,
          -canvas.height / 2,
          canvas.width,
          canvas.height
        );
      };
    }
  }, [rotatedImage, angle]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("angle", angle);
    setClicked(true);

    try {
      const response = await fetch("http://localhost:5000/rotate", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setRotatedImage(url);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error occurred while rotating image:", error);
    }
  };

  return (
    <div className="container">
      {isClick ? (
        <div>
          <canvas className="canvas" ref={canvasRef} />
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-auto">
              <label htmlFor="angle-input" className="form-label">
                Açı:
              </label>
              <input
                className="form-control"
                name="angle"
                type="number"
                value={angle}
                onChange={(event) => setAngle(event.target.value)}
                id="angle-input"
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">
                Döndür
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-auto">
              <label htmlFor="angle-input" className="form-label">
                Açı:
              </label>
              <input
                className="form-control"
                name="angle"
                type="number"
                value={angle}
                onChange={(event) => setAngle(event.target.value)}
                id="angle-input"
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">
                Döndür
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Rotate;

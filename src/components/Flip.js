import React, { useState } from "react";

function Flip({ file }) {
  const [axis, setAxis] = useState("0");
  const [isClick, setClicked] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("axis", axis);
    setClicked(true);
    try {
      const response = await fetch("http://localhost:5000/flip", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const img = document.getElementById("flip");
        img.src = url;
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error occurred while flipping image:", error);
    }
  };

  const handleAxisChange = (event) => {
    setAxis(event.target.value);
    
  };

  return (
    <form onSubmit={handleSubmit}>
    <div>
    <div>
        <input
          type="radio"
          id="vertical"
          name="axis"
          value="0"
          checked={axis === "0"}
          onChange={handleAxisChange}
        />
        <label htmlFor="vertical">Dikey</label>
      </div>
      <div>
        <input
          type="radio"
          id="horizontal"
          name="axis"
          value="1"
          checked={axis === "1"}
          onChange={handleAxisChange}
        />
        <label htmlFor="horizontal">Yatay</label>
       
      </div>
    </div>

    {isClick ? (<div>

    <img id="flip" style={{ width: '500px', height:"auto" } } />
    <button className="btn" type="submit">Çevir</button>
    
     </div>):<button className="btn" type="submit">Çevir</button>}
  
    </form>
  );
}

export default Flip;

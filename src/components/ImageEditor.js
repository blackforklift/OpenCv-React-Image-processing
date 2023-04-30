import React, { useState ,useRef} from "react";
import DropArea from "./DropArea";
import Rotate from "./Rotate";
import Crop from "./Crop";
import Size from "./Size";
import Flip from "./Flip";

function ImageEditor() {
  const [file, setFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [angle, setAngle] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [sizewidth, setsWidth] = useState("");
  const [sizeheight, setsHeight] = useState("");
  const [axis, setAxis] = useState("0");

  const handleAxisChange = (event) => {
    setAxis(event.target.value);
  };
  const handleDrop = (droppedFiles) => {
    setFile(droppedFiles[0]);
  };
  const imageRef = useRef(null);

  return (
    <div className="container-fluid">
      {!file && (
        <DropArea
          onDrop={handleDrop}
          isDragActive={isDragActive}
          setIsDragActive={setIsDragActive}
        />
      )}
      {file && (
        <div className="controls">
          <div className="row">
            <div className="col-md-4">
              <div className="image-container">
                <img
                  id="image-orginal"
                  className="img-fluid"
                  style={{ width: "350px", height: "auto" }}
                  src={URL.createObjectURL(file)}
                  alt="Uploaded file"
                  onLoad={(event) => {
                    document.getElementById("boyutlar").innerHTML="Orjinal boyutlar: "+(event.target.naturalWidth)+"px genişlik ve \n"+(event.target.naturalHeight)+"px uzunluk";
                  }}
                />
                <p id="boyutlar"></p>
                <p>Gösterilen boyut 350px genişliğindedir. </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="controls">
                {/* Boyutlandır */}
                <div className="mb-3">
                  <label htmlFor="sizewidth" className="form-label">
                    Genişlik:
                  </label>
                  <input
                    className="form-control"
                    id="sizewidth"
                    name="sizewidth"
                    type="number"
                    value={sizewidth}
                    onChange={(event) => setsWidth(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="sizeheight" className="form-label">
                   Yükseklik:
                  </label>
                  <input
                    className="form-control"
                    id="sizeheight"
                    name="sizeheight"
                    type="number"
                    value={sizeheight}
                    onChange={(event) => setsHeight(event.target.value)}
                  />
                </div>
                <Size file={file} width={sizewidth} height={sizeheight} />
                {/* döndür */}
                <Rotate file={file} angle={angle} />
                {/* kırp */}
                <div className="mb-3">
                  <label htmlFor="x" className="form-label">
                    X:
                  </label>
                  <input
                    className="form-control"
                    id="x"
                    name="x"
                    type="number"
                    value={x}
                    onChange={(event) => setX(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="y" className="form-label">
                    Y:
                  </label>
                  <input
                    className="form-control"
                    id="y"
                    name="y"
                    type="number"
                    value={y}
                    onChange={(event) => setY(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="width" className="form-label">
                    X 2:
                  </label>
                  <input
                    className="form-control"
                    id="width"
                    name="width"
                    type="number"
                    value={width}
                    onChange={(event) => setWidth(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="height" className="form-label">
                    Y 2:
                  </label>
                  <input
                    className="form-control"
                    id="height"
                    name="height"
                    type="number"
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                  />
                </div>
                 <Crop file={file} x={x} y={y} width={width} height={height} />
                 <Flip file={file} />
        </div>
      </div>
    </div>
  </div>
)}
  </div>
);
}

export default ImageEditor;

import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

function DropArea({ onDrop, isDragActive }) {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const dropzoneStyle = {
   
    minWidth:"600px",
    minHeight:"400px",
    border: '2px dashed #dededc',
    padding:"20px",
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem',
   
    fontWeight: 'bold',

   marginBottom:"100px"
  };

  return (
    <div className="dropzone" style={dropzoneStyle} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <div>
          <i className="fas fa-upload" style={{ color: "#fbfada" }}></i>
          <p>Dosyalarınızı bırakın..</p>
        </div>
      ) : (
        <div>
          <p>Dosyaları sürükleyip bırakın ya da tıklayın</p>
        </div>
      )}
    </div>
  );
}

DropArea.propTypes = {
  onDrop: PropTypes.func.isRequired,
  isDragActive: PropTypes.bool.isRequired
};

export default DropArea;

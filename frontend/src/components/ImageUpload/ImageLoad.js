// ImageLoad.js
import React from "react";
import "./ImageLoad.css";

import clearify from '../../image/Capture.PNG';

const ImageLoad = (props) => {
  const { image, output } = props;

  const handleReload = () => {
    window.location.reload();
  };

  return (

   <>







    <div className="image-load">
      
      
      <div className="image-container">
        <img src={image} alt={image} />
        <p>Original Image</p>
      </div>

      <div className="image-container">
        <img src={output} alt={output} />
        <p>Output Image</p>
      </div>


    </div>





    <div className="image-load">
     
     <div className="reload-container">
 

        <p className="reload-button">

        X ray image deblurring using the trained Deep Learning model.

    <hr/>
Average Structural Similarity Index of Model:  0.98896
<hr/>
Average Peak Signal-to-Noise Ratio of Model: 40.12646

        </p>

      </div>


      </div>


    <div className="image-load1">
      
      <div className="image-container1 image-container">
      
      <p>Result</p>
        <img src={clearify} alt={clearify} />
      
      </div>
   
      </div>
    




      <div className="reload-container">
        <button className="reload-button" onClick={handleReload}>
          Reload
        </button>

      </div>

      {/* <button className="reload-button" onClick={handleReload}>
        Reload
      </button>
   */}


    </>
  );
};

export default ImageLoad;
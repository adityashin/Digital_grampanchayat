import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Slides() {
  return (
    <div>
       <ToastContainer />
       <img
        src="./assests/home1.png"
        style={{
          width: "100%", // Make the video stretch to fill the width
          height: "100vh", // Ensure the video fills the height of the container
          objectFit: "cover", // Maintain aspect ratio and fill the container without distortion
        }}
      />
    </div>
  )
}

export default Slides

import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageLoad from "./ImageLoad";
import { Line } from "rc-progress";
import "./ImageUpload.css";

const ImageUpload = () => {
  const api = "http://3.111.223.19:8000/api/upload_image/";
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [outputImg, setOutputImg] = useState("");
  const [id, setId] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setUploadProgress(0);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://3.111.223.19:8000/api/posts/${id}`)
        .then((response) => {
          let path = response.data.image.replace(
            "incoming_blurred_images",
            "outgoing_de_blurred_images"
          );
          setOutputImg(path);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress > 100) {
        clearInterval(interval);
        return;
      }
      setUploadProgress(currentProgress);
    }, 500);

    setTimeout(() => {
      axios
        .post(api, formData)
        .then((response) => {
          clearInterval(interval);
          setId(response.data.id);
          setSubmitted(true);
        })
        .catch((error) => console.log(error));
    }, 4000);
  };

  return (
    <div>
      {imageUrl && submitted ? (
        <ImageLoad title={title} image={imageUrl} output={outputImg} />
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
            <label htmlFor="image">Image</label>
            <input type="file" id="image" onChange={handleImageChange} />
            <button type="submit">Upload</button>
            <Line
              percent={uploadProgress}
              strokeWidth="2"
              strokeColor="#00BFFF"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

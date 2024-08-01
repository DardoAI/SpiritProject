import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    console.log(message);
  }, [message]);

  const sendPrompt = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/discover/", { prompt: prompt })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const sendPreviewContent = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/preview/", { prompt: prompt })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="container border border-dark d-flex flex-column gap-5 p-5 text-white">
      <div className="d-flex flex-column align-items-center">
        <h1>Spirit</h1>
        <p>Ask, and I will discover for you.</p>
      </div>
      <div className="d-flex flex-row gap-2">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Type your text here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <button
          className="btn btn-primary"
          onClick={(event) => sendPreviewContent(event)}
        >
          Content Preview
        </button>
      </div>
      <div>
        <p>Here your preview will be displayed</p>
      </div>
      <div className="d-flex flex-column align-items-center">
        <button
          className="btn btn-primary"
          onClick={(event) => sendPrompt(event)}
        >
          Discover
        </button>
      </div>
    </div>
  );
};

export default Home;

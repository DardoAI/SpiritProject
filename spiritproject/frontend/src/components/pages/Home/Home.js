import React, { useEffect, useState } from "react";
import axios from "axios";
import Prompter from "./Prompter";
import SourceSelection from "./SourceSelection";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [choice, setChoice] = useState([]);
  const [stage, setStage] = useState(0);

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
    <>
      {stage === 0 && (
        <Prompter
          prompt={prompt}
          setPrompt={setPrompt}
          sendPreviewContent={sendPreviewContent}
          setStage={setStage}
        />
      )}

      {stage === 1 && (
        <SourceSelection
          choice={choice}
          setChoice={setChoice}
          setStage={setStage}
        />
      )}

      {stage === 2 && <div></div>}
    </>
  );
};

export default Home;

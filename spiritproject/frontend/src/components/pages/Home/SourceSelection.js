import React, { useState, useEffect } from "react";
import NewspaperButton from "./SourceSelectionShared/NewspaperButton";
import SocialButton from "./SourceSelectionShared/SocialButton";

const SourceSelection = ({ choice, setChoice, setStage }) => {
  const handleNewspaperClick = () => {
    if (choice.includes("newspaper")) {
      setChoice((prevChoices) =>
        prevChoices.filter((item) => item !== "newspaper")
      );
    } else setChoice((prevChoices) => [...prevChoices, "newspaper"]);
  };

  const handleSocialClick = () => {
    if (choice.includes("social")) {
      setChoice((prevChoices) =>
        prevChoices.filter((item) => item !== "social")
      );
    } else setChoice((prevChoices) => [...prevChoices, "social"]);
  };

  useEffect(() => {
    console.log("Choice has changed:", choice);
  }, [choice]);

  return (
    <div className="d-flex flex-column border border-dark min-vh-100">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h1>Where do you want to get your data?</h1>
        {choice.length !== 0 && (
          <button
            className="btn btn-primary"
            onClick={() => {
              setStage(2);
            }}
          >
            Choose data volume
          </button>
        )}
      </div>
      <div className="d-flex flex-row border flex-grow-1">
        <NewspaperButton onClick={handleNewspaperClick} />
        <SocialButton onClick={handleSocialClick} />
      </div>
    </div>
  );
};

export default SourceSelection;

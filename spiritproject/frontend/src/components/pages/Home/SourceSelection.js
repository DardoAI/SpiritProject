import React, { useState, useEffect } from "react";
import NewspaperButton from "./SourceSelectionShared/NewspaperButton";
import SocialButton from "./SourceSelectionShared/SocialButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

const SourceSelection = ({
  choice,
  setChoice,
  setStage,
  amount,
  newspaper,
  social,
  setAmount,
  setNewspaper,
  setSocial,
}) => {
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

  const handleAmountChange = (event, newValue) => {
    setAmount(newValue);
  };

  const handleNewspaperChange = (event, bool, newspaper) => {
    if (bool) {
      setNewspaper((prevNewspapers) => [...prevNewspapers, newspaper]);
    } else {
      setNewspaper((prevNewspapers) =>
        prevNewspapers.filter((item) => item !== newspaper)
      );
    }
  };

  const handleSocialChange = (event, bool, social) => {
    if (bool) {
      setSocial((prevSocials) => [...prevSocials, social]);
    } else {
      setSocial((prevSocials) => prevSocials.filter((item) => item !== social));
    }
  };

  const marks = [
    {
      value: 1,
      label: "Small",
    },
    {
      value: 2,
      label: "Medium",
    },
    {
      value: 3,
      label: "Large",
    },
  ];

  useEffect(() => {
    console.log("Choice has changed:", choice);
  }, [choice]);

  useEffect(() => {
    console.log("Amount has changed:", amount);
  }, [amount]);

  useEffect(() => {
    console.log("Newspaper has changed:", newspaper);
  }, [newspaper]);

  useEffect(() => {
    console.log("Social has changed:", social);
  }, [social]);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  let theme = createTheme({
    // Theme customization goes here as usual, including tonalOffset and/or
    // contrastThreshold as the augmentColor() function relies on these
  });
  theme = createTheme(theme, {
    // Custom colors created with augmentColor go here
    palette: {
      black: theme.palette.augmentColor({
        color: {
          main: "#222222",
        },
        name: "black",
      }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="d-flex flex-column border border-dark min-vh-100">
        <div className="container d-flex flex-column gap-3 p-5 text-white align-items-center ">
          <h1>Choose your data</h1>
          <div className="col-10 d-flex justify-content-evenly align-items-center">
            <Button
              variant="contained"
              color={choice.includes("newspaper") ? "secondary" : "black"}
              onClick={handleNewspaperClick}
              sx={
                choice.includes("newspaper")
                  ? {
                      width: "200px", // Custom width
                      height: "60px", // Custom height
                      fontSize: "1.2rem", // Larger text size
                    }
                  : {
                      width: "160px", // Custom width
                      height: "48px", // Custom height
                      fontSize: "1rem", // Larger text size
                    }
              }
            >
              Newspapers
            </Button>
            <Button
              variant="contained"
              color={choice.includes("social") ? "secondary" : "black"}
              onClick={handleSocialClick}
              sx={
                choice.includes("social")
                  ? {
                      width: "200px", // Custom width
                      height: "60px", // Custom height
                      fontSize: "1.2rem", // Larger text size
                    }
                  : {
                      width: "160px", // Custom width
                      height: "48px", // Custom height
                      fontSize: "1rem", // Larger text size
                    }
              }
            >
              Socials
            </Button>
          </div>
          <div
            className="col-10 p-5 bg-dark rounded d-flex flex-column"
            style={{ gap: "5rem" }}
          >
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h5 className="col-3">Amount</h5>
              <Slider
                className="mx-5"
                defaultValue={2}
                onChange={handleAmountChange}
                aria-label="Default"
                min={1}
                max={3}
                marks={marks}
                step={1}
                valueLabelDisplay="off"
                color="secondary"
                sx={{
                  "& .MuiSlider-markLabel": {
                    color: "white", // Change this to the desired color
                    padding: "5px",
                  },
                }}
              />
            </div>
            {choice.includes("newspaper") && (
              <div className="d-flex flex-row gap-3 align-items-center">
                <h5 className="col-3">Newspapers</h5>
                <div className="d-flex justify-content-evenly align-items-center flex-grow-1">
                  <FormControlLabel
                    control={<Checkbox defaultChecked color="secondary" />}
                    label="Repubblica"
                    onChange={(event, newValue) =>
                      handleNewspaperChange(event, newValue, "repubblica")
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox color="secondary" />}
                    label="Giornale"
                    onChange={(event, newValue) =>
                      handleNewspaperChange(event, newValue, "giornale")
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox color="secondary" />}
                    label="Ansa"
                    onChange={(event, newValue) =>
                      handleNewspaperChange(event, newValue, "ansa")
                    }
                  />
                </div>
              </div>
            )}
            {choice.includes("social") && (
              <div className="d-flex flex-row gap-3 align-items-center">
                <h5 className="col-3">Socials</h5>
                <div className="d-flex justify-content-evenly align-items-center flex-grow-1">
                  <FormControlLabel
                    control={<Checkbox defaultChecked color="secondary" />}
                    label="Twitter"
                    onChange={(event, newValue) =>
                      handleSocialChange(event, newValue, "twitter")
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox color="secondary" />}
                    label="Reddit"
                    onChange={(event, newValue) =>
                      handleSocialChange(event, newValue, "reddit")
                    }
                  />
                </div>
              </div>
            )}

            <div className="d-flex flex-column text-danger">
              {choice.length === 0 && (
                <h5>
                  ERROR: You have to select at least one source (Newspapers or
                  Socials)
                </h5>
              )}
              {choice.includes("newspaper") && newspaper.length === 0 && (
                <h5>ERROR: You have to select at least one newspaper</h5>
              )}
              {choice.includes("social") && social.length === 0 && (
                <h5>ERROR: You have to select at least one social network</h5>
              )}
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center">
              <Button variant="outlined" color="secondary">
                Discover
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SourceSelection;

import React from "react";
import Button from "@mui/material/Button";
import { COLORS } from "../../assets";

const CustomButton = ({
  type,
  text,
  textColor = COLORS.blueLight5,
  backgroundColor = COLORS.blueLight1,
  onClick,
  fontSize = "1.125rem",
}) => {
  const TYPES = {
    primary: {
      color: COLORS.blueLight5,
      backgroundColor: backgroundColor,
      fontFamily: "Barlow",
      fontWeight: "bold",
      letterSpacing: "0.06cm",
      borderRadius: "5px",
      fontSize: fontSize,
    },
    secondary: {
      color: textColor,
      backgroundColor: backgroundColor,
      fontFamily: "Barlow",
      fontWeight: "bold",
      letterSpacing: "0.06cm",
      borderRadius: "5px",
      fontSize: fontSize,
    },
    tertiary: {
      color: textColor,
      textTransform: "none",
      fontFamily: "Barlow",
      fontWeight: "bold",
      letterSpacing: "0.06cm",
      borderRadius: "5px",
      fontSize: fontSize,
    },
  };
  return (
    <Button
      style={TYPES[type]}
      variant={type === "tertiary" ? "text" : "contained"}
      disableElevation
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CustomButton;

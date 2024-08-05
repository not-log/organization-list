import { ChangeEventHandler, FC, FocusEventHandler, useState } from "react";

import { useDebouncedCallback } from "@app/hooks";
import { Box, SxProps, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

const typographyStyles: SxProps = {
  height: "22px",
  paddingBottom: "1px",

  fontSize: "16px",
  lineHeight: "22px",
  fontWeight: 400,
  letterSpacing: "normal",

  borderBottom: "2px solid",
  borderColor: "transparent",
};

const inputResetStyles: SxProps = {
  margin: 0,
  padding: 0,
  border: 0,
  outline: 0,
  whiteSpace: "normal",
  background: "none",
  width: "100%",

  "&:focus-visible": {
    borderColor: blue[600],
  },

  ...typographyStyles,
};

type EditableFieldProps = {
  text: string;
  onChange: (value: string) => void;
};

const EditableTextField: FC<EditableFieldProps> = ({ text, onChange }) => {
  const [value, setValue] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  const [changeText, cancelChangeText] = useDebouncedCallback((delayedValue: string) => {
    onChange(delayedValue);
  }, 250);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleEndEditing = () => {
    setIsEditing(false);

    cancelChangeText();
    onChange(value);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setValue(value);
    changeText(value);
  };

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    event.target.select();
  };

  if (isEditing) {
    return (
      <Box
        component="input"
        sx={inputResetStyles}
        onChange={handleChange}
        onFocus={handleInputFocus}
        onBlur={handleEndEditing}
        value={value}
        autoFocus
      />
    );
  }

  return (
    <Typography
      sx={{
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        cursor: "text",
        ...typographyStyles,
      }}
      onClick={handleStartEditing}
      onFocus={handleStartEditing}
      tabIndex={0}
    >
      {value}
    </Typography>
  );
};

export default EditableTextField;

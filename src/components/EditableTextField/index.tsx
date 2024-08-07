import { ChangeEventHandler, FC, FocusEventHandler, useState } from "react";

import { useDebouncedCallback } from "@app/hooks";
import { mergeSx } from "@app/lib";
import { Box, Typography } from "@mui/material";

import * as styles from "./styles";

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
        sx={styles.inputReset}
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
      sx={mergeSx(styles.typography, styles.trimText)}
      onClick={handleStartEditing}
      onFocus={handleStartEditing}
      tabIndex={0}
    >
      {value}
    </Typography>
  );
};

export default EditableTextField;

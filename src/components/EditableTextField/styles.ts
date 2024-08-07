import { SxProps } from "@mui/material";
import { blue } from "@mui/material/colors";

export const typography: SxProps = {
  height: "22px",
  paddingBottom: "1px",

  fontSize: "16px",
  lineHeight: "22px",
  fontWeight: 400,
  letterSpacing: "normal",

  borderBottom: "2px solid",
  borderColor: "transparent",

  cursor: "text",
};

export const trimText: SxProps = {
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const inputReset: SxProps = {
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

  ...typography,
};

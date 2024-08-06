import { SxProps } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

export const root: SxProps = {
  overflow: "clip",
  border: "1px solid",
  borderColor: grey[500],
  borderRadius: "8px",
};

export const table: SxProps = {
  position: "relative",
  tableLayout: "fixed",

  "th:not(:first-of-type), td:not(:first-of-type)": {
    borderLeft: "1px solid",
    borderLeftColor: grey[500],
  },
};

export const stickyHeader: SxProps = {
  zIndex: 10,

  position: "sticky",
  top: "-1px",
  height: "max-content",

  backgroundColor: grey[200],
};

export const row: SxProps = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
};

export const rowLayout: SxProps = {
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "min-content 240px minmax(200px, auto) min-content",
};

export const selectedRow: SxProps = {
  backgroundColor: blue[50],
};

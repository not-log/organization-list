import { SxProps } from "@mui/material";

export const cellPadding: SxProps = {
  padding: "6px 8px",
};

export const root: SxProps = {
  width: "100%",
  borderCollapse: "collapse",

  "&&& td, &&& th": {
    ...cellPadding,
  },
};

export const headerCell: SxProps = {
  fontSize: "15px",
  fontWeight: 500,
  textAlign: "start",
};

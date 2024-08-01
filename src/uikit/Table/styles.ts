import { SxProps } from "@mui/material";
import { grey } from "@mui/material/colors";

const borderColor = grey[100];

export const cellPadding: SxProps = {
  padding: "6px 8px",
};

export const root: SxProps = {
  width: "100%",
  display: "grid",

  border: "1px solid",
  borderColor,
  borderRadius: "8px",

  overflow: "clip",

  "thead, tbody, tr": {
    display: "contents",
  },

  "&&& td, &&& th": {
    ...cellPadding,
  },

  // граница под хедером
  th: {
    borderBottom: "1px solid",
    borderBottomColor: borderColor,
    backgroundColor: borderColor,
  },

  // граница слева от ячеек
  "th:not(:first-of-type), td:not(:first-of-type)": {
    borderLeft: "1px solid",
    borderLeftColor: borderColor,
  },
};

export const headerCell: SxProps = {
  fontSize: "15px",
  fontWeight: 500,
  textAlign: "start",
};

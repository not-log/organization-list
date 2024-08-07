import { FC } from "react";

import { Table } from "@app/uikit";
import { CircularProgress, SxProps } from "@mui/material";

const styles: SxProps = {
  position: "absolute",
  bottom: 0,

  display: "grid",
  placeItems: "center",
  width: "100%",
  paddingBlock: "120px 32px",

  background: "linear-gradient(0deg, #ffffff 20%, transparent 100%)",
};

const LoadingTableRow: FC = () => {
  return (
    <Table.Row sx={styles}>
      <Table.DataCell>
        <CircularProgress />
      </Table.DataCell>
    </Table.Row>
  );
};

export default LoadingTableRow;

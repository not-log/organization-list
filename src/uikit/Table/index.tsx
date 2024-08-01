import { forwardRef, ForwardRefRenderFunction } from "react";

import { mergeSx } from "@app/lib";
import { Box } from "@mui/material";
import clsx from "clsx";

import { TableBody, TableDataCell, TableFooter, TableHead, TableHeaderCell, TableRow } from "./components";
import * as styles from "./styles";
import { TableProps } from "./types";

type TableComposition = {
  Head: typeof TableHead;
  Body: typeof TableBody;
  Footer: typeof TableFooter;
  Row: typeof TableRow;
  HeaderCell: typeof TableHeaderCell;
  DataCell: typeof TableDataCell;
};

const Table: ForwardRefRenderFunction<HTMLTableElement, TableProps> = (props, ref) => {
  return (
    <Box
      component="table"
      {...props}
      className={clsx("table", props.className)}
      ref={ref}
      sx={mergeSx(styles.root, props.sx)}
    />
  );
};

const TableWithRef = forwardRef<HTMLTableElement, TableProps>(Table);
const TableWithComposition: typeof TableWithRef & TableComposition = TableWithRef as typeof TableWithRef &
  TableComposition;

TableWithComposition.Head = TableHead;
TableWithComposition.Body = TableBody;
TableWithComposition.Footer = TableFooter;
TableWithComposition.Row = TableRow;
TableWithComposition.HeaderCell = TableHeaderCell;
TableWithComposition.DataCell = TableDataCell;

export default TableWithComposition;

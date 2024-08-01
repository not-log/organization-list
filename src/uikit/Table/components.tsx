import { forwardRef, ForwardRefRenderFunction } from "react";

import { mergeSx } from "@app/lib";
import { Box } from "@mui/material";
import clsx from "clsx";

import * as styles from "./styles";
import { TableCellProps, TableRowProps, TableSectionProps } from "./types";

const TableHeadComponent: ForwardRefRenderFunction<HTMLTableSectionElement, TableSectionProps> = (props, ref) => {
  return (
    <Box
      component="thead"
      {...props}
      ref={ref}
      className={clsx("table-head", props.className)}
      sx={mergeSx(props.sx)}
    />
  );
};

const TableBodyComponent: ForwardRefRenderFunction<HTMLTableSectionElement, TableSectionProps> = (props, ref) => {
  return (
    <Box
      component="tbody"
      {...props}
      ref={ref}
      className={clsx("table-body", props.className)}
      sx={mergeSx(props.sx)}
    />
  );
};

const TableFooterComponent: ForwardRefRenderFunction<HTMLTableSectionElement, TableSectionProps> = (props, ref) => {
  return (
    <Box
      component="tfoot"
      {...props}
      ref={ref}
      className={clsx("table-footer", props.className)}
      sx={mergeSx(props.sx)}
    />
  );
};

const TableRowComponent: ForwardRefRenderFunction<HTMLTableRowElement, TableRowProps> = (props, ref) => {
  return (
    <Box component="tr" {...props} ref={ref} className={clsx("table-row", props.className)} sx={mergeSx(props.sx)} />
  );
};

const TableHeaderCellComponent: ForwardRefRenderFunction<HTMLTableCellElement, TableCellProps> = (props, ref) => {
  return (
    <Box
      component="th"
      {...props}
      ref={ref}
      className={clsx("table-header-cell", props.className)}
      sx={mergeSx(styles.headerCell, props.sx)}
    />
  );
};

const TableDataCellComponent: ForwardRefRenderFunction<HTMLTableCellElement, TableCellProps> = (props, ref) => {
  return (
    <Box
      component="td"
      {...props}
      ref={ref}
      className={clsx("table-data-cell", props.className)}
      sx={mergeSx(props.sx)}
    />
  );
};

export const TableHead = forwardRef<HTMLTableSectionElement, TableSectionProps>(TableHeadComponent);
export const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(TableBodyComponent);
export const TableFooter = forwardRef<HTMLTableSectionElement, TableSectionProps>(TableFooterComponent);
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(TableRowComponent);
export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableCellProps>(TableHeaderCellComponent);
export const TableDataCell = forwardRef<HTMLTableCellElement, TableCellProps>(TableDataCellComponent);

import { DetailedHTMLProps, HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes } from "react";

import { BoxProps } from "@mui/system";

type TableHtmlProps = DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
type TableSectionHtmlProps = DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
type TableRowHtmlProps = DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
type TableCellHtmlProps = DetailedHTMLProps<TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>;

export type TableProps = BoxProps & TableHtmlProps;
export type TableSectionProps = BoxProps & TableSectionHtmlProps;
export type TableRowProps = BoxProps & TableRowHtmlProps;
export type TableCellProps = BoxProps & TableCellHtmlProps;

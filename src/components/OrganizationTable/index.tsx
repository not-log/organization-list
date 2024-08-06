import { ComponentProps, FC, useRef, useState } from "react";

import { mergeSx } from "@app/lib";
import { Organization } from "@app/types";
import { Checkbox, Table } from "@app/uikit";
import { Box, Button, SxProps, Typography } from "@mui/material";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import EditableTextField from "../EditableTextField";
import * as styles from "./styles";

type CheckboxOnChangeHandler = ComponentProps<typeof Checkbox>["onChange"];

type OrganizationTableProps = {
  organizations: Organization[];
  onSelectOrganization: (id: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  onDeleteOrganization: (id: string) => void;
  onEditOrganizationName: (id: string, name: string) => void;
  onEditOrganizationAddress: (id: string, address: string) => void;
};

const OrganizationTable: FC<OrganizationTableProps> = ({
  organizations,
  onSelectOrganization,
  onSelectAll,
  onDeleteOrganization,
  onEditOrganizationName,
  onEditOrganizationAddress,
}) => {
  const [isAllSelected, setAllSelected] = useState(false);

  const tableRef = useRef<HTMLTableElement>(null);
  const tableHeaderRef = useRef<HTMLTableSectionElement>(null);

  const virtualizer = useWindowVirtualizer({
    count: organizations.length,
    estimateSize: () => 42,
    overscan: 20,
  });

  const handleSelectAll: CheckboxOnChangeHandler = (_, checked) => {
    setAllSelected(checked);
    onSelectAll(checked);
  };

  const getEntityHandlers = (id: string) => {
    const selectHandler: CheckboxOnChangeHandler = (_, checked) => {
      onSelectOrganization(id, checked);
    };

    return {
      delete: () => onDeleteOrganization(id),
      editName: (name: string) => onEditOrganizationName(id, name),
      editAddress: (address: string) => onEditOrganizationAddress(id, address),
      select: selectHandler,
    };
  };

  const virtualRows = virtualizer.getVirtualItems();
  const headerHeight = tableHeaderRef.current?.offsetHeight ?? 0;

  const dynamicTableStyles: SxProps = {
    height: `${virtualizer.getTotalSize() + headerHeight}px`,
  };

  return (
    <Box className="organization-table" sx={styles.root}>
      <Table ref={tableRef} sx={mergeSx(styles.table, dynamicTableStyles)}>
        <Table.Head ref={tableHeaderRef} sx={styles.stickyHeader}>
          <Table.Row sx={styles.rowLayout}>
            <Table.HeaderCell>
              <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Typography>Компания</Typography>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Typography>Адрес</Typography>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Button variant="text" color="warning" size="small" sx={{ opacity: 0 }} tabIndex={-1}>
                Удалить
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {virtualRows.map((virtualItem) => {
            const { index, size, start } = virtualItem;
            const { id, name, address, isSelected } = organizations[index];

            const handlers = getEntityHandlers(id);

            const dynamicRowStyles: SxProps = {
              height: `${size}px`,
              transform: `translateY(${start + headerHeight}px)`,
            };

            const computedRowStyles = mergeSx(
              styles.row,
              styles.rowLayout,
              dynamicRowStyles,
              isSelected && styles.selectedRow,
            );

            return (
              <Table.Row key={id} data-index={index} ref={virtualizer.measureElement} sx={computedRowStyles}>
                <Table.DataCell>
                  <Checkbox checked={isSelected} onChange={handlers.select} />
                </Table.DataCell>
                <Table.DataCell>
                  <EditableTextField text={name} onChange={handlers.editName} />
                </Table.DataCell>
                <Table.DataCell display="grid">
                  <EditableTextField text={address} onChange={handlers.editAddress} />
                </Table.DataCell>
                <Table.DataCell>
                  <Button variant="text" color="warning" size="small" onClick={handlers.delete}>
                    Удалить
                  </Button>
                </Table.DataCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Box>
  );
};

export default OrganizationTable;

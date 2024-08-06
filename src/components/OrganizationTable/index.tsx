import { ComponentProps, FC, useRef, useState } from "react";

import { mergeSx } from "@app/lib";
import { Organization } from "@app/types";
import { Checkbox, Table } from "@app/uikit";
import { Box, Button, SxProps, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import EditableTextField from "../EditableTextField";

type CheckboxOnChangeHandler = ComponentProps<typeof Checkbox>["onChange"];

const stickyHeaderStyles: SxProps = {
  zIndex: 10,
  position: "sticky",
  top: 0,
  height: "max-content",

  backgroundColor: grey[200],
};

const selectedCellStyles: SxProps = {
  backgroundColor: blue[50],
};

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
    overscan: 10,
    scrollMargin: tableRef.current?.offsetTop ?? 0,
  });

  const handleSelectOrganization = (id: string) => {
    const handler: CheckboxOnChangeHandler = (_, checked) => {
      onSelectOrganization(id, checked);
    };
    return handler;
  };

  const handleSelectAll: CheckboxOnChangeHandler = (_, checked) => {
    setAllSelected(checked);
    onSelectAll(checked);
  };

  const handleDeleteOrganization = (id: string) => {
    return () => onDeleteOrganization(id);
  };

  const handleEditOrganizationName = (id: string) => {
    return (name: string) => onEditOrganizationName(id, name);
  };

  const handleEditOrganizationAddress = (id: string) => {
    return (address: string) => onEditOrganizationAddress(id, address);
  };

  const virtualRows = virtualizer.getVirtualItems();

  const tableGridTemplateColumns = "min-content 240px minmax(200px, auto) min-content";

  return (
    <Box sx={{ border: "1px solid", borderColor: grey[500], borderRadius: "8px", overflow: "clip" }}>
      <Table
        ref={tableRef}
        sx={{
          tableLayout: "fixed",

          position: "relative",
          height: `${virtualizer.getTotalSize() + 37}px`,

          "th:not(:first-of-type), td:not(:first-of-type)": {
            borderLeft: "1px solid",
            borderLeftColor: grey[500],
          },
        }}
      >
        <Table.Head ref={tableHeaderRef} sx={stickyHeaderStyles}>
          <Table.Row display="grid" gridAutoFlow="column" gridTemplateColumns={tableGridTemplateColumns}>
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

            const positionStyles: SxProps = {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${size}px`,
              // ! TODO сделать отдельный расчет высоты хедера
              transform: `translateY(${start + 37}px)`,
            };

            const computedStyles = mergeSx(isSelected && selectedCellStyles, positionStyles);

            return (
              <Table.Row
                key={id}
                data-index={index}
                ref={virtualizer.measureElement}
                sx={computedStyles}
                display="grid"
                gridAutoFlow="column"
                gridTemplateColumns={tableGridTemplateColumns}
              >
                <Table.DataCell>
                  <Checkbox checked={isSelected} onChange={handleSelectOrganization(id)} />
                </Table.DataCell>
                <Table.DataCell>
                  <EditableTextField text={name} onChange={handleEditOrganizationName(id)} />
                </Table.DataCell>
                <Table.DataCell display="grid">
                  <EditableTextField text={address} onChange={handleEditOrganizationAddress(id)} />
                </Table.DataCell>
                <Table.DataCell>
                  <Button variant="text" color="warning" size="small" onClick={handleDeleteOrganization(id)}>
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

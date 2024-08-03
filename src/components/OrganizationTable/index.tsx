import { ComponentProps, FC } from "react";

import { mergeSx } from "@app/lib";
import { Organization } from "@app/types";
import { Checkbox, Table } from "@app/uikit";
import { SxProps, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

const stickyCellStyles: SxProps = {
  zIndex: 10,
  position: "sticky",
  top: 0,
};

const selectedCellStyles: SxProps = {
  backgroundColor: blue[50],
};

type OrganizationTableProps = {
  organizations: Organization[];
  onRowSelect: (id: string, isSelected: boolean) => void;
};

const OrganizationTable: FC<OrganizationTableProps> = ({ organizations, onRowSelect }) => {
  const handleRowSelect = (id: string) => {
    const handler: ComponentProps<typeof Checkbox>["onChange"] = (_, checked) => {
      onRowSelect(id, checked);
    };
    return handler;
  };

  return (
    <Table sx={{ gridTemplateColumns: "auto 1fr 3fr", overflow: "clip" }}>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell sx={stickyCellStyles}>
            <Checkbox />
          </Table.HeaderCell>
          <Table.HeaderCell sx={stickyCellStyles}>
            <Typography>Компания</Typography>
          </Table.HeaderCell>
          <Table.HeaderCell sx={stickyCellStyles}>
            <Typography>Адрес</Typography>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {organizations.map((organization) => {
          const { id, name, address, isSelected } = organization;

          const cellProps = {
            sx: mergeSx(isSelected && selectedCellStyles),
          };

          return (
            <Table.Row key={id}>
              <Table.DataCell {...cellProps}>
                <Checkbox checked={isSelected} onChange={handleRowSelect(id)} />
              </Table.DataCell>
              <Table.DataCell {...cellProps}>
                <Typography>{name}</Typography>
              </Table.DataCell>
              <Table.DataCell {...cellProps}>
                <Typography>{address}</Typography>
              </Table.DataCell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default OrganizationTable;

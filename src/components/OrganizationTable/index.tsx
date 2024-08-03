import { ComponentProps, FC, useState } from "react";

import { mergeSx } from "@app/lib";
import { Organization } from "@app/types";
import { Checkbox, Table } from "@app/uikit";
import { SxProps, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

type CheckboxOnChangeHandler = ComponentProps<typeof Checkbox>["onChange"];

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
  onSelectOrganization: (id: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
};

const OrganizationTable: FC<OrganizationTableProps> = ({ organizations, onSelectOrganization, onSelectAll }) => {
  const [isAllSelected, setAllSelected] = useState(false);

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

  return (
    <Table sx={{ gridTemplateColumns: "auto 1fr 3fr", overflow: "clip" }}>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell sx={stickyCellStyles}>
            <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
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
                <Checkbox checked={isSelected} onChange={handleSelectOrganization(id)} />
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

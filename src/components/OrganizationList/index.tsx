import { FC } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@app/hooks";
import { organizationsActions } from "@app/store/organizatonsSlice";
import { Box } from "@mui/material";

import OrganizationTable from "../OrganizationTable";

const OrganizationList: FC = () => {
  const organizations = useAppSelector((state) => state.organizations);

  const dispatch = useDispatch();

  const handleSelectOrganization = (id: string, isSelected: boolean) => {
    dispatch(organizationsActions.updateById({ id, updatedParams: { isSelected } }));
  };

  const handleSelectAll = (isSelected: boolean) => {
    const updatedOrganizations = organizations.map((organization) => ({
      ...organization,
      isSelected,
    }));
    dispatch(organizationsActions.update(updatedOrganizations));
  };

  const handleDeleteOrganization = (id: string) => {
    dispatch(organizationsActions.deleteByIds([id]));
  };

  const handleDeleteSelected = () => {
    const updatedOrganizations = organizations.filter((organization) => !organization.isSelected);
    dispatch(organizationsActions.update(updatedOrganizations));
  };

  const handleEditOrganizationName = (id: string, name: string) => {
    dispatch(organizationsActions.updateById({ id, updatedParams: { name } }));
  };

  const handleEditOrganizationAddress = (id: string, address: string) => {
    dispatch(organizationsActions.updateById({ id, updatedParams: { address } }));
  };

  return (
    <Box className="organization-list">
      {/* add organization */}
      {/* delete selected */}
      <OrganizationTable
        organizations={organizations}
        onSelectOrganization={handleSelectOrganization}
        onSelectAll={handleSelectAll}
        onDeleteOrganization={handleDeleteOrganization}
        onEditOrganizationName={handleEditOrganizationName}
        onEditOrganizationAddress={handleEditOrganizationAddress}
      />
    </Box>
  );
};

export default OrganizationList;

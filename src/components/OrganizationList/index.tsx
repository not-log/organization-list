import { FC, useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import { organizationsActions, organizationThunks } from "@app/store/organizatonsSlice";
import { Box } from "@mui/material";

import OrganizationControls from "../OrganizationControls";
import OrganizationTable from "../OrganizationTable";

const OrganizationList: FC = () => {
  const dispatch = useAppDispatch();
  const { data: organizations, isLoading } = useAppSelector((state) => state.organizations);

  const handleSelectOrganization = (id: string, isSelected: boolean) => {
    dispatch(organizationsActions.updateById({ id, updatedParams: { isSelected } }));
  };

  const handleSelectAll = (isSelected: boolean) => {
    const updatedOrganizations = organizations.map((organization) => ({
      ...organization,
      isSelected,
    }));
    dispatch(organizationsActions.replace(updatedOrganizations));
  };

  const handleDeleteOrganization = (id: string) => {
    dispatch(organizationsActions.deleteByIds([id]));
  };

  const handleEditOrganizationName = (id: string, name: string) => {
    dispatch(organizationsActions.updateById({ id, updatedParams: { name } }));
  };

  const handleEditOrganizationAddress = (id: string, address: string) => {
    dispatch(organizationsActions.updateById({ id, updatedParams: { address } }));
  };

  const loadMoreOrganizations = useCallback(() => {
    return dispatch(organizationThunks.loadMoreThunk());
  }, [dispatch]);

  return (
    <Box className="organization-list">
      <OrganizationControls />

      <Box marginTop="32px">
        <OrganizationTable
          organizations={organizations}
          isLoading={isLoading}
          onSelectOrganization={handleSelectOrganization}
          onSelectAll={handleSelectAll}
          onDeleteOrganization={handleDeleteOrganization}
          onEditOrganizationName={handleEditOrganizationName}
          onEditOrganizationAddress={handleEditOrganizationAddress}
          onLoadMoreOrganizations={loadMoreOrganizations}
        />
      </Box>
    </Box>
  );
};

export default OrganizationList;

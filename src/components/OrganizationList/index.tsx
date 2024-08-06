import { FC, useCallback, useState } from "react";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import { organizationsActions, organizationThunks } from "@app/store/organizatonsSlice";
import { Box, Button, Collapse } from "@mui/material";

import OrganizationTable from "../OrganizationTable";

const OrganizationList: FC = () => {
  const dispatch = useAppDispatch();
  const { data: organizations, isLoading } = useAppSelector((state) => state.organizations);

  const [isCreateFormOpen, setCreateFormOpen] = useState(false);

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

  const handleDeleteSelectedOrganizations = () => {
    const updatedOrganizations = organizations.filter((organization) => !organization.isSelected);
    // ! странное название экшена -> replace ?
    dispatch(organizationsActions.update(updatedOrganizations));
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

  const toggleCreateForm = () => setCreateFormOpen((value) => !value);

  return (
    <Box className="organization-list">
      <Box sx={{ display: "flex", gap: "16px" }}>
        <Button onClick={toggleCreateForm} variant="outlined">
          Форма добавления {isCreateFormOpen ? "⬆️" : "⬇️"}
        </Button>
        <Button onClick={handleDeleteSelectedOrganizations} color="error" variant="contained">
          Удалить выбранные
        </Button>
      </Box>
      <Collapse in={isCreateFormOpen}>
        <Box sx={{ height: "100px", marginTop: "16px" }}>add form</Box>
      </Collapse>

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

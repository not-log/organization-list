import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import { createOrganization } from "@app/lib";
import { organizationsActions } from "@app/store/organizatonsSlice";
import { Box, Button, Collapse } from "@mui/material";

const OrganizationControls: FC = () => {
  const dispatch = useAppDispatch();
  const { data: organizations } = useAppSelector((state) => state.organizations);

  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createAddress, setCreateAddress] = useState("");

  const toggleCreateForm = () => setCreateFormOpen((value) => !value);

  const handleDeleteSelectedOrganizations = () => {
    const updatedOrganizations = organizations.filter((organization) => !organization.isSelected);
    dispatch(organizationsActions.replace(updatedOrganizations));
  };

  const handleChangeCreateName: ChangeEventHandler<HTMLInputElement> = (event) => setCreateName(event?.target.value);
  const handleChangeCreateAddress: ChangeEventHandler<HTMLInputElement> = (event) =>
    setCreateAddress(event?.target.value);

  const handleCreateOrganization: MouseEventHandler = (event) => {
    event.preventDefault();
    const organization = createOrganization(createName, createAddress);
    dispatch(organizationsActions.addFirst(organization));

    setCreateName("");
    setCreateAddress("");
    setCreateFormOpen(false);
  };

  return (
    <Box className="organization-controls">
      <Box sx={{ display: "flex", gap: "16px" }}>
        <Button onClick={toggleCreateForm} variant="outlined">
          Форма добавления {isCreateFormOpen ? "⬆️" : "⬇️"}
        </Button>
        <Button onClick={handleDeleteSelectedOrganizations} color="error" variant="contained">
          Удалить выбранные
        </Button>
      </Box>
      <Collapse in={isCreateFormOpen}>
        <Box component="form" sx={{ display: "flex", gap: "8px", marginTop: "16px" }}>
          <input value={createName} onChange={handleChangeCreateName} placeholder="Название" />
          <input value={createAddress} onChange={handleChangeCreateAddress} placeholder="Адрес" />
          <button onClick={handleCreateOrganization}>Добавить</button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default OrganizationControls;

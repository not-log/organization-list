import { FC } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@app/hooks";
import { organizationsActions } from "@app/store/organizatonsSlice";

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

  return (
    <OrganizationTable
      organizations={organizations}
      onSelectOrganization={handleSelectOrganization}
      onSelectAll={handleSelectAll}
    />
  );
};

export default OrganizationList;

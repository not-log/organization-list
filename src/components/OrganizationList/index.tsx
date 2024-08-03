import { FC } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@app/hooks";
import { organizationsActions } from "@app/store/organizatonsSlice";

import OrganizationTable from "../OrganizationTable";

const OrganizationList: FC = () => {
  const organizations = useAppSelector((state) => state.organizations);

  const dispatch = useDispatch();

  const handleRowSelect = (id: string, isSelected: boolean) => {
    dispatch(organizationsActions.updateById({ id, updatedParams: { isSelected } }));
  };

  return <OrganizationTable organizations={organizations} onRowSelect={handleRowSelect} />;
};

export default OrganizationList;

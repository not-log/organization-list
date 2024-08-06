import { createOrganizationList } from "@app/lib";
import { Organization } from "@app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = createOrganizationList(1000);

type UpdatedActionPayload = {
  id: string;
  updatedParams: Partial<Omit<Organization, "id">>;
};

const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    addFirst(state, action: PayloadAction<Organization>) {
      state.unshift(action.payload);
    },
    deleteByIds(state, action: PayloadAction<string[]>) {
      return state.filter((organization) => !action.payload.includes(organization.id));
    },
    updateById(state, action: PayloadAction<UpdatedActionPayload>) {
      const { id, updatedParams } = action.payload;

      const currentOrganizationIndex = state.findIndex((organization) => organization.id === id);

      if (currentOrganizationIndex !== -1) {
        const oldOrganization = state[currentOrganizationIndex];
        state[currentOrganizationIndex] = { ...oldOrganization, ...updatedParams };
      }
    },
    update(_, action: PayloadAction<typeof initialState>) {
      return action.payload;
    },
    pushMany(state, action: PayloadAction<number>) {
      state.push(...createOrganizationList(action.payload));
    },
  },
});

export const organizationsActions = organizationsSlice.actions;
export default organizationsSlice;

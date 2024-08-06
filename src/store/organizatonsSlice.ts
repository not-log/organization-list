import { createOrganizationList } from "@app/lib";
import { Organization } from "@app/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const PAGE_SIZE = 10_000;

const initialState = {
  data: createOrganizationList(PAGE_SIZE),
  isLoading: false,
};

const loadMoreThunk = createAsyncThunk("organizations/loadMore", async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return createOrganizationList(PAGE_SIZE);
});

type UpdatedActionPayload = {
  id: string;
  updatedParams: Partial<Omit<Organization, "id">>;
};

const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    addFirst(state, action: PayloadAction<Organization>) {
      state.data.unshift(action.payload);
    },
    deleteByIds(state, action: PayloadAction<string[]>) {
      state.data = state.data.filter((organization) => !action.payload.includes(organization.id));
    },
    updateById(state, action: PayloadAction<UpdatedActionPayload>) {
      const { id, updatedParams } = action.payload;

      const currentOrganizationIndex = state.data.findIndex((organization) => organization.id === id);

      if (currentOrganizationIndex !== -1) {
        const oldOrganization = state.data[currentOrganizationIndex];
        state.data[currentOrganizationIndex] = { ...oldOrganization, ...updatedParams };
      }
    },
    update(state, action: PayloadAction<(typeof initialState)["data"]>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMoreThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadMoreThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(...action.payload);
    });
    builder.addCase(loadMoreThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const organizationThunks = {
  loadMoreThunk,
};

export const organizationsActions = organizationsSlice.actions;
export default organizationsSlice;

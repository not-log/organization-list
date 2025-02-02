import { Box } from "@mui/material";

import OrganizationList from "./components/OrganizationList";
import { StoreProvider } from "./providers";

function App() {
  return (
    <StoreProvider>
      <Box sx={{ maxWidth: "800px", marginInline: "auto", paddingBottom: "128px" }}>
        <OrganizationList />
      </Box>
    </StoreProvider>
  );
}

export default App;

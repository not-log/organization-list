import { Typography } from "@mui/material";

import { StoreProvider } from "./providers";

function App() {
  return (
    <StoreProvider>
      <Typography>Hello</Typography>
    </StoreProvider>
  );
}

export default App;

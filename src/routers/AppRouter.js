import { MantineProvider } from "@mantine/core";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MapPage from "../components/MapPage";
import { PageNotFound } from "../components/PageNotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <MantineProvider
        theme={{
          loader: "oval",
          colorScheme: "dark",
        }}
        emotionOptions={{ key: "mantine" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Routes>
          <Route path="/" element={<MapPage />} exact />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
};

export default AppRouter;

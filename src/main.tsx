import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { ConfigProvider } from "antd";
import { GLOBAL_THEME } from "./const.ts";
import { AppContextProvider } from "./store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={GLOBAL_THEME}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ConfigProvider>
  </StrictMode>
);

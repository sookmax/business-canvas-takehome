import { Layout } from "./components/primitives/Layout";
import { RecordFormModal } from "./components/RecordFormModal";
import { RecordTable } from "./components/RecordTable";
import { AppHeader } from "./components/AppHeader";
import React, { useEffect } from "react";
import { AppContextProvider, useAppState } from "./store";
import { ConfigProvider } from "antd";
import { GLOBAL_THEME } from "./const";

export function App() {
  return (
    <ConfigProvider theme={GLOBAL_THEME}>
      <AppContextProvider>
        <AppImplWrapper />
      </AppContextProvider>
    </ConfigProvider>
  );
}

function AppImplWrapper() {
  const { records } = useAppState();

  useEffect(() => {
    if (import.meta.env.VITE_STORAGE === "local-storage") {
      localStorage.setItem("records", JSON.stringify(records));
    } else {
      localStorage.removeItem("records");
    }
  }, [records]);

  return <AppImpl />;
}

const AppImpl = React.memo(function AppImpl() {
  return (
    <>
      <Layout>
        <Layout.Header>
          <AppHeader />
        </Layout.Header>
        <Layout.Content
          style={{
            padding: "var(--ant-layout-header-padding)",
          }}
        >
          <RecordTable />
        </Layout.Content>
      </Layout>
      <RecordFormModal />
    </>
  );
});

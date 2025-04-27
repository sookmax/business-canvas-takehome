import { Layout } from "./components/primitives/Layout";
import { RecordFormModal } from "./components/RecordFormModal";
import { RecordTable } from "./components/RecordTable";
import { AppHeader } from "./components/AppHeader";
import React, { useEffect } from "react";
import { useAppState } from "./store";

export function App() {
  const { records } = useAppState();

  useEffect(() => {
    if (import.meta.env.VITE_STORAGE === "local-storage") {
      localStorage.setItem("records", JSON.stringify(records));
    } else {
      localStorage.removeItem("records");
    }
  }, [records]);

  return <AppInner />;
}

const AppInner = React.memo(function AppInner() {
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

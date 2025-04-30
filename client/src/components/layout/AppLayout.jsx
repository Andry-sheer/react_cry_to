import { Layout, Spin } from "antd";
import { useCrypto } from "../../context/crypto-context";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppSider from "./AppSider";
import AppContent from "./AppContent";

export const AppLayout = () => {
  const { loading } = useCrypto();

  if (loading) {
    return <Spin tip="Loading..." size="large" fullscreen />;
  }

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
      <AppFooter />
    </Layout>
  );
};

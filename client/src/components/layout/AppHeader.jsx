import { useEffect, useState } from "react";
import { Layout, Select, Space, Tooltip, Button } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { AppModal } from "./AppModal";
import { CoinInfoModal } from "../CoinInfoModal";
import { AppDrawer } from "./AppDrawer";
import { AddAssetForm } from "../AddAssetForm";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const AppHeader = () => {
  const { crypto } = useCrypto();
  const [openSelect, setOpenSelect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);


  useEffect(() => {
    const keyPressHandler = (e) => {
      if (e.key === "/") {
        setOpenSelect((prev) => !prev);
      }
    };

    document.addEventListener("keypress", keyPressHandler);

    return () => {
      document.removeEventListener("keypress", keyPressHandler);
    };
  }, []);

  const handleSelect = (value) => {
    setIsModalOpen(true);
    setCoin(crypto.find((c) => c.id === value));
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open={openSelect}
        style={{ width: "20%" }}
        value="press / search"
        onSelect={handleSelect}
        onClick={() => setOpenSelect((prev) => !prev)}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20, height: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />

      <Button
        onClick={() => setDrawer(true)}
        type="primary"
        icon={<AppstoreAddOutlined />}
        aria-label="Add new asset"
      >
        Add Asset
      </Button>

      <AppModal open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
        <CoinInfoModal coin={coin} />
      </AppModal>

      <AppDrawer 
        open={drawer}
        onClose={() => setDrawer(false)}
      >
        <AddAssetForm onClose={()=> setDrawer(false)} />
      </AppDrawer>
    </Layout.Header>
  );
};

export default AppHeader;

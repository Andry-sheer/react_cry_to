import { Drawer } from "antd"


export const AppDrawer = ({ open, onClose, children }) => {

  return (
    <Drawer
      title="Add Asset"
      placement="right"
      width={500}
      closable={false}
      onClose={onClose}
      open={open}
      destroyOnClose
    >
      {children}
    </Drawer> 
  )
}
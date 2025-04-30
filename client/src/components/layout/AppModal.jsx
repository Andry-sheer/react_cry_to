
import { Modal } from 'antd';

export const AppModal = ({ children, open, onCancel }) => (
  <Modal width={'30%'} open={open} onCancel={onCancel} footer={null}>
    {children}
  </Modal>
)
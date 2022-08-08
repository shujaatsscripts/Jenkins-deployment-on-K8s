import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Input from '../../components/Input';

const Popup = ({ handle, error, history, ...rest }) => {
  const [password, setPassword] = useState('');
  return error ? (
    <Modal
      visible={true}
      footer={[
        <Button type="primary" onClick={() => history.push('/')}>
          Ok
        </Button>,
      ]}
      title="Error"
      closable={false}
      centered
    >
      <div>{error}</div>
    </Modal>
  ) : (
    <Modal
      {...rest}
      centered
      closable={false}
      title="Enter Meeting Password"
      footer={[
        <Button type="primary" onClick={() => handle(password)}>
          Join
        </Button>,
      ]}
    >
      <Input
        inputType="meeting_password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="123 456 789"
      />
    </Modal>
  );
};

export default Popup;

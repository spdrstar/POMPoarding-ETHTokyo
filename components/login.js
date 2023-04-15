import React, { useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { Icon, MonochromeIcons, CallToAction } from '@magiclabs/ui';
import { Mail } from "./Mail";

const Login = ({ onEmailSubmit, disabled }) => {
  const [visible, setVisible] = React.useState(true);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    if(e) {
        e.preventDefault();
        onEmailSubmit(email);
        //setVisible(false);
        //console.log("closed");
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        open={visible}
        onClose={handleSubmit}
        closeButton={false}
        preventClose
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to POMP
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            contentLeft={<Mail fill="currentColor" />}
          />
        </Modal.Body>
        <Modal.Footer justify="center">
          <CallToAction
            leadingIcon={MonochromeIcons.PaperPlane}
            color='primary'
            size='sm'
            onClick={handleSubmit}
            disabled={disabled}
          >
            Send Magic Link
          </CallToAction>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;

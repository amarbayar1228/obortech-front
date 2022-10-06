import { Button, Modal } from "antd";
import { useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import Head from "next/head";
export default function User() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <div>
      <Head>
        <title>USER | OBORTECH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="img/OBORTECH_logo_V_clean.svg" />
      </Head>
      <BaseLayout pageName="user">
        <Button type="primary" onClick={showModal}>
          Open Modal with async logic
        </Button>
        <Modal
          title="Title"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </BaseLayout>
    </div>
  );
}
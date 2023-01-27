// import { Button, message, Modal } from "antd";
// import React from "react";
// import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
// import axios from "axios";
// const GroupItemDelete = (props) => {
//   const confirm = () => {
//     Modal.confirm({ title: "Delete Group", icon: <ExclamationCircleOutlined />,
//       content: "Bla bla ...",
//       okText: "Yes",
//       onOk: okButtonProps,
//       cancelText: "No",
//     });
//   };
//   const okButtonProps = () => {
//     console.log("props", props);
//     const body = {
//       func: "delGroups",
//       pkId: props.groupData.pkId,
//     };
//     // axios.post("/api/post/Gate", body).then((res) => {
//     //     console.log("res delete: ", res.data);
//     //     props.getGroupItems(); 
//     //     message.success("amjilttai");
//     //   }).catch((err) => {console.log("err: ", err)});
//   };

//   return (
//     <div>
//       <Button style={{ marginLeft: "5px" }} danger type="primary" shape="circle"size="small"onClick={confirm}icon={<DeleteOutlined />}></Button>
//     </div>
//   );
// };

// export default GroupItemDelete;

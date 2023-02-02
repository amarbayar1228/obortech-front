import { Alert, Button, Input, Modal } from "antd";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
const { TextArea } = Input;

const WithdrawalRequest = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [descSh, setDescSh] = useState(false);
    const recaptchaRef = useRef();
    const [userFormCapt, setUserFormCapt] = useState(true);
  
  
  const onChangeCaptcha = (a) =>{ 
   
    a == null ? setUserFormCapt(true) : setUserFormCapt(false);
  }
  const errorCapt = (err) =>{
    console.log("err", err);
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setUserFormCapt(true);
    setDescSh(false)
    setIsModalOpen(false);
  };
    return <div>
        <Button onClick={showModal}>Submit a withdrawal request</Button>
        <Modal title="Submit a withdrawal request" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
        footer={descSh ? <> <Button>Cancel</Button><Button type="primary" disabled={userFormCapt}>Ok</Button> </> :<Button onClick={()=>setDescSh(true)}>Next</Button>  }>
            {!descSh ? 
        <Alert message="Informational Notes" 
         description="Detailed description and advice about successful copywriting."
        type="info" showIcon />
        : <div> 
            <Alert message="Informational Notes" description="Detailed description and advice about successful copywriting." type="info" showIcon style={{marginBottom: "10px"}}/>
            <TextArea  showCount maxLength={100} placeholder="description"/>
            <div style={{marginTop: "20px", display: "flex", justifyContent: "center"}}>
                <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef}   sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
            </div>
        </div> } 
      </Modal>
    </div>
}
export default WithdrawalRequest;
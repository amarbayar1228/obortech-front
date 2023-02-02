import { Button } from "antd"
import { useEffect } from "react"
import { useRouter } from "next/router";
import axios from "axios";

const TdbBank = () =>{
const router = useRouter();
useEffect(()=>{
    // console.log("object", router.query); 
   
},[])
const TdbBankfunc = () =>{
    // console.log("object", router.query); 
const body = {
    func: "tdbm",
    body: router.query.body,
    fbclid: router.query.fbclid,
    parameter1: router.query.parameter1,
    parameter2: router.query.parameter2, 
}
    // axios.post("/api/post/Gate", body).then((res)=>{
    //     console.log("res", res.data);
    // }).catch((err)=>{
    //     console.log("err");
    // })
}
return <div>
    <Button onClick={TdbBankfunc}>
        send
    </Button>
</div>
}
export default TdbBank;
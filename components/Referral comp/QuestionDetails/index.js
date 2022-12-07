import { Button, Input, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import css from "./style.module.css"
const { TextArea } = Input;
const QuestionDetails = (props)=>{
const [questionData, setQuestionData] = useState([]);
const router = useRouter();

const [ques1, setQues1] = useState([]); 
const [quesValue1, setQuesValue1] = useState(822); 
const [selectState, setSelectState] = useState(""); 
const [othersValue, setOthersValue] = useState("");
const [otherStatus, setOtherStatus] = useState("");
const [ques1Label, setQues1Label] = useState("");

const [ques2, setQues2] = useState([{namemn: "aaa"},{nameeng: "bbb"}]);
const [ques2value, setQues2Value] = useState("");
const [ques2Status, setQues2Status] = useState("");

const [ques3Data, setQues3Data] = useState([{namemn: "aaa"},{nameeng: "bbb"}]);
const [ques3Value, setQues3Value] = useState("");
const [ques3Status, setQues3Status] = useState("");

const [ques4Data, setQues4Data] = useState([{namemn: "aaa"},{nameeng: "bbb"}]);
const [ques4Value, setQues4Value] = useState(822);
const [ques4Status, setQues4Status] = useState("");
const [others4Value, setOthers4Value] = useState("");
const [others4Status, setOthers4Status] = useState("");
const [ques4Label, setQues4Label] = useState("");

const [ques5Data, setQues5Data] = useState([{namemn: "aaa"},{nameeng: "bbb"}]);
const [ques5Value, setQues5Value] = useState(822);
const [ques5Status, setQues5Status] = useState("");
const [others5Value, setOthers5Value] = useState("");
const [others5Status, setOthers5Status] = useState("");
const [ques5Label, setQues5Label] = useState("");

const [ques6Data, setQues6Data] = useState([{namemn: "aaa"},{nameeng: "bbb"}]);
const [ques6Value, setQues6Value] = useState(822);
const [ques6Status, setQues6Status] = useState("");
const [others6Value, setOthers6Value] = useState("");
const [others6Status, setOthers6Status] = useState("");
const [ques6Label, setQues6Label] = useState("");

const [ques7Data, setQues7Data] = useState([{namemn: "aaa"},{nameeng: "bbb"}]);
const [ques7Value, setQues7Value] = useState(822);
const [ques7Status, setQues7Status] = useState("");
const [others7Value, setOthers7Value] = useState("");
const [others7Status, setOthers7Status] = useState("");
const [ques7Label, setQues7Label] = useState("");

const [ques8Data, setQues8Data] = useState([{namemn: "aaa"},{nameeng: "bbb"}]);
const [ques8Value, setQues8Value] = useState(822);
const [ques8Status, setQues8Status] = useState("");
const [others8Value, setOthers8Value] = useState("");
const [others8Status, setOthers8Status] = useState("");
const [ques8Label, setQues8Label] = useState("");

const [ques9Data, setQues9Data] = useState([{namemn: "aaa"},{nameeng: "bbb"}]);
const [ques9Value, setQues9Value] = useState(822);
const [ques9Status, setQues9Status] = useState("");
const [others9Value, setOthers9Value] = useState("");
const [others9Status, setOthers9Status] = useState("");
const [ques9Label, setQues9Label] = useState("");

useEffect(()=>{
getDatas();
console.log("useEff");

},[]);
const getDatas = () =>{
const question = {
func:"getTypes",  
parid:0,
type_:3
}
axios.post("/api/post/Gate", question).then((res)=>{
 
setQuestionData(res.data.data)
}).catch((err)=>{console.log("err", err)})
questions();
}

const questions = () =>{
// question 1
const question1 = {
func:"getTypes",  
parid:32,
type_:3
}
axios.post("/api/post/Gate", question1).then((res)=>{
 
setQues1(res.data.data)
}).catch((err)=>{console.log("err", err)})

// question 2
const question2 = {
    func:"getTypes",  
    parid:33,
    type_:3
    }
    axios.post("/api/post/Gate", question2).then((res)=>{ 
        console.log("q2 ", res.data.data);
    setQues2(res.data.data)
    }).catch((err)=>{console.log("err", err)})
// question 3
const question3 = {
    func:"getTypes",  
    parid:34,
    type_:3
    }
    axios.post("/api/post/Gate", question3).then((res)=>{ 
        setQues3Data(res.data.data)
    }).catch((err)=>{console.log("err", err)})

// question 4
const question4 = {
    func:"getTypes",  
    parid:35,
    type_:3
    }
    axios.post("/api/post/Gate", question4).then((res)=>{ 
       
        setQues4Data(res.data.data)
    }).catch((err)=>{console.log("err", err)})
// question 5
const question5 = {
    func:"getTypes",  
    parid:36,
    type_:3
    }
    axios.post("/api/post/Gate", question5).then((res)=>{ 
       
        setQues5Data(res.data.data)
    }).catch((err)=>{console.log("err", err)})
// question 6
const question6 = {
    func:"getTypes",  
    parid:37,
    type_:3
    }
    axios.post("/api/post/Gate", question6).then((res)=>{ 
        setQues6Data(res.data.data)
    }).catch((err)=>{console.log("err", err)})
// question 7
const question7 = {
    func:"getTypes",  
    parid:38,
    type_:3
    }
    axios.post("/api/post/Gate", question7).then((res)=>{ 
        setQues7Data(res.data.data)
    }).catch((err)=>{console.log("err", err)})

// question 8
const question8 = {
    func:"getTypes",  
    parid:39,
    type_:3
    }
    axios.post("/api/post/Gate", question8).then((res)=>{ 
        setQues8Data(res.data.data)
    }).catch((err)=>{console.log("err", err)})

// question 9
const question9 = {
    func:"getTypes",  
    parid:40,
    type_:3
    }
    axios.post("/api/post/Gate", question9).then((res)=>{ 
        setQues9Data(res.data.data)
    }).catch((err)=>{console.log("err", err)})

} 
const selectFnc1 = (e,b,c) =>{ 
console.log("b", b); 
setSelectState("");
setQues1Label(b.label)
setQuesValue1(b.value);
}

const quest2Onchange = (e)=>{
    setQues2Value(e.target.value);
    setQues2Status("");
}
const saveFunc = () =>{
    console.log("a", othersValue);
    if(quesValue1 === 822 ){ 
        setSelectState("error");
    }else {
        console.log("blsn");
    }
    if(quesValue1 === 9){
        if(othersValue === ""){ 
            setOtherStatus("error");
        }
    }

    if(ques2value === ""){
        setQues2Status("error");
    }
    if(ques3Value === ""){
        setQues3Status("error");
    }
    if(ques4Value === 822){
        setQues4Status("error");
    }
    if(ques4Value === 9){
        if(others4Value === ""){ 
            setOthers4Status("error");
        }
    }

    if(ques5Value === 822){
        setQues5Status("error");
    }
    if(ques5Value === 11){
        if(others5Value === ""){
            setOthers5Status("error");
        }
    }
    if(ques6Value === 822){
        setQues6Status("error");
    }
    if(ques6Value === 13){
        if(others6Value === ""){
            setOthers6Status("error");
        }
    }

    if(ques7Value === 822){
        setQues7Status("error");
    }
    if(ques7Value === 1){
        if(others7Value === ""){
            setOthers7Status("error");
        }
    }

    if(ques8Value === 822){
        setQues8Status("error");
    }

    if(ques9Value === 822){
        setQues9Status("error");
    }

    if(ques2value === "" || quesValue1 === 822 || ques3Value === "" || ques4Value === 822 || ques5Value === 822 || ques6Value === 822 || ques7Value === 822 || ques8Value === 822 || ques9Value === 822){
        message.error("Fill in all fields?");
    }else {
        console.log("question 1 label", ques1Label, "value: ", othersValue);
        console.log("question 2 value", ques2value);
        console.log("question 3 value", ques3Value);
        console.log("question 4 label", ques4Label, "value: ", others4Value);
        console.log("question 5 label", ques5Label, "value: ", others5Value);
        console.log("question 6 label", ques6Label, "value: ", others6Value);
        console.log("question 8 label", ques8Value);
    }

}
return <div className={css.Scrollcss}> 
{questionData.map((e, i)=>( 
    <div key={i} className={css.Layout}> 
    <div style={{margin: "5px", display: "flex"}}> <div className={css.Star}> * </div> <div style={{width: "calc(100% - 20px)"}}>{router.locale === "mn" ? e.namemn : e.nameeng}? </div> </div>
    {e.index_ === 32 ? 
    <div className={css.Secletcss}>
    <Select status={selectState} autoFocus={true} defaultValue="Choose your question?"   options={ques1.map((e, i)=>({label:  router.locale === "mn" ? e.namemn : e.nameeng, value: i}))} style={{width: "100%"}} onChange={selectFnc1}/>
    {quesValue1 === 9 ? <div><TextArea status={otherStatus} placeholder="" onChange={(e)=> (setOthersValue(e.target.value), setOtherStatus(""))}/> </div> : ""}
    </div>
    : e.index_ === 33 ? 
    <div className={css.Secletcss}> 
        <Input status={ques2Status} placeholder={router.locale === "mn" ? ques2[0].namemn : ques2[0].nameeng} onChange={quest2Onchange}/>  
    </div> 
    : e.index_ === 34 ? 
        <div className={css.Secletcss}> <Input status={ques3Status} placeholder={router.locale === "mn" ? ques3Data[0].namemn : ques3Data[0].nameeng} onChange={(e)=>(setQues3Value(e.target.value), setQues3Status("")) }/></div>

    : e.index_ === 35 ?
        <div className={css.Secletcss}>
            <Select status={ques4Status}  defaultValue="Choose your question?" options={ques4Data.map((e, i)=>({label:  router.locale === "mn" ? e.namemn : e.nameeng, value: i}))} style={{width: "100%"}} 
            onChange={(a, b)=> (setQues4Value(b.value), setQues4Status(""), setQues4Label(b.label))}/>
        {ques4Value === 9 ? <div><TextArea status={others4Status} placeholder="" onChange={(e)=> (setOthers4Value(e.target.value), setOthers4Status(""))}/> </div> : ""} </div>
    : e.index_ === 36 ? 
        <div className={css.Secletcss}> 
        <Select status={ques5Status}  defaultValue="Choose your question?" options={ques5Data.map((e, i)=>({label:  router.locale === "mn" ? e.namemn : e.nameeng, value: i}))} style={{width: "100%"}} 
        onChange={(a, b)=> (setQues5Value(b.value), setQues5Status(""), setQues5Label(b.label))}/>
        {ques5Value === 11 ? <div><TextArea status={others5Status} placeholder="" onChange={(e)=> (setOthers5Value(e.target.value), setOthers5Status(""))}/> </div> : ""}
        </div>
    : e.index_ === 37 ?
    <div className={css.Secletcss}> 
    <Select status={ques6Status}  defaultValue="Choose your question?" options={ques6Data.map((e, i)=>({label:  router.locale === "mn" ? e.namemn : e.nameeng, value: i}))} style={{width: "100%"}} 
    onChange={(a, b)=> (setQues6Value(b.value), setQues6Status(""), setQues6Label(b.label))}/>
    {ques6Value === 13 ? <div><TextArea status={others6Status} placeholder="" onChange={(e)=> (setOthers6Value(e.target.value), setOthers6Status(""))}/> </div> : ""}
    </div>
    : e.index_ === 38 ? 
        <div className={css.Secletcss}> 
            <Select status={ques7Status}  defaultValue="Choose your question?" options={ques7Data.map((e, i)=>({label:  router.locale === "mn" ? e.namemn : e.nameeng, value: i}))} style={{width: "100%"}} 
    onChange={(a, b)=> (setQues7Value(b.value), setQues7Status(""), setQues7Label(b.label))}/>
    {ques7Value === 1 ? <div><TextArea status={others7Status} placeholder="" onChange={(e)=> (setOthers7Value(e.target.value), setOthers7Status(""))}/> </div> : ""}
        </div>
    : e.index_ === 39 ?
    <div className={css.Secletcss}> 
    <Select status={ques8Status}  defaultValue="Choose your question?" options={ques8Data.map((e, i)=>({label:  router.locale === "mn" ? e.namemn : e.nameeng, value: i}))} style={{width: "100%"}} 
    onChange={(a, b)=> (setQues8Value(b.value), setQues8Status(""), setQues8Label(b.label))}/> 
    </div>
    : e.index_ === 40 ?
    <div className={css.Secletcss}> 
    <Select status={ques9Status}  defaultValue="Choose your question?" options={ques9Data.map((e, i)=>({label:  router.locale === "mn" ? e.namemn : e.nameeng, value: i}))} style={{width: "100%"}} 
    onChange={(a, b)=> (setQues9Value(b.value), setQues9Status(""), setQues9Label(b.label))}/> 
    </div>
    : null 
    }
    </div>  
    
    ))}
    <div className={css.BtnSave}> <Button onClick={saveFunc}>Save</Button></div>
</div>
}
export default QuestionDetails;
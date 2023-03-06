import { Button, Space, Switch, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ItemDetails from './ItemDetails';

const ItemInfo = (props) =>{
    const [checkStrictly, setCheckStrictly] = useState(false);
    const [title, setTitle] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [childItem, setChildItem] = useState([]);

    useEffect(()=>{
        console.log("props: ", props);
    
    },[]); 
const getItemsDetails = (a) =>{
    console.log("pkID: ", a);
    setLoading(true);
    const body = {
        func: "getGroups",
        pkId: a.pkId,
        };
        axios.post("/api/post/Gate", body).then((res) => {
            console.log("res details:  ", res.data.data.itemList); 
            if (res.data.data.itemList == undefined) {console.log("hoosn");
            } else {
                
                setTitle(a.title);
                setChildItem(res.data.data.itemList);
                setCheckStrictly(true);
                setLoading(false);
            //  setGitemDetails(res.data.data.itemList); 
            //  setDetailsSpin(false);
        }
        }).catch((err) => {console.log("err", err)});
}

    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description', 
          ellipsis: true,
        },
        {
          title: 'Quantity',
          dataIndex: 'cnt', 
          key: 'cnt',
          ellipsis: true,
        },
        {
        title: 'Price',
        dataIndex: 'price', 
        key: 'price',
        ellipsis: true,
        },
        {
        title: <div>Action</div>,
        dataIndex: 'action',
        key: 'action',  
        render: (a) =>  <div>
        {a.state === 2 ? "" :
        <Button onClick={()=>getItemsDetails(a)} size="small"> 
            Group item
        </Button>
        }
        </div>, 
        ellipsis: true,
        }, 
      ];
      const data = props.modalOrderItem.map((r, i)=>(
        {
        key: i,
        title: r.title,
        description: r.description,
        cnt: r.cnt,
        price: r.price,  
        action: r
        // children: r.state === 1 ? [{
        //     key: i.toString(),
        //     title: r.title,
        //     age: 42,
        //     address: 'New York No. 2 Lake Park',
        // }] : "",

        } 
    ));  

     const Ctrue = () =>{
        setCheckStrictly(true);
     }
     const Cfalse = () =>{
        setCheckStrictly(false);
     }
    return<div>   
        {!checkStrictly ?
            <Table
                size='small'
                scroll={{x: 400}}
                columns={columns}
                dataSource={data}
                loading={loading}
            />
                    : 
            <ItemDetails item={childItem} title={title} Cfalse={Cfalse}/>
    }
    </div>
}
export default ItemInfo;
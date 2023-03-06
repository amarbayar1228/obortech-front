 import { useEffect } from "react";
import { Button,   Table } from 'antd';
import { ArrowLeftOutlined} from "@ant-design/icons";
import axios from 'axios'; 
const ItemDetails = (props) =>{
    useEffect(()=>{
        console.log("object", props);
    },[])
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
      ];
      const data = props.item.map((r, i)=>(
        {
        key: i,
        title: r.title,
        description: r.description,
        cnt: r.itemCnt,
        price: r.itemPriceD,   
        // children: r.state === 1 ? [{
        //     key: i.toString(),
        //     title: r.title,
        //     age: 42,
        //     address: 'New York No. 2 Lake Park',
        // }] : "",

        } 
    ));  
    return<div>
        <div style={{margin: "10px 0px"}}>  <Button icon={<ArrowLeftOutlined />} type="link" size="small" style={{fontWeight: "600", textTransform: "uppercase"}} onClick={()=> props.Cfalse()}>{props.title} </Button>  </div> 
       
        <Table

        size='small'
        scroll={{x: 400}}
        columns={columns}
        dataSource={data}
      />
    </div>
}
export default ItemDetails;
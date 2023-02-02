import { Button, Input, Table } from "antd"
import css from "./style.module.css"
export const InvoiceRequest = () =>{
const { Search } = Input;
const onSearch = (value) => console.log(value);
const columns = [
{
title: 'Date',
width: 150,
dataIndex: 'date',
key: 'date', 
fixed: 'left',
sorter: true,
},  
{
title: 'Order id',
width: 100,
dataIndex: 'orderId',
key: 'orderId',  
sorter: true,
},  
{
title: 'Invoice Number',
dataIndex: 'invoiceNumber',
key: 'invoiceNumber',
width: 120,
},
{
title: 'Surename',
dataIndex: 'surename',
key: 'surename', 
width: 120
},
{
title: 'Last name',
dataIndex: 'lastname',
key: 'lastname', 
width: 120
},
{
title: 'Email',
dataIndex: 'email',
key: 'email', 
width: 150
},
{
title: 'Address',
dataIndex: 'address',
key: 'address', 
width: 170
}, 
{
title: 'Price',
dataIndex: 'price',
key: 'price', 
width: 100,
},
// {
// title: 'Organzination name',
// dataIndex: 'orgName',
// key: 'orgName',
// width: 150
// },  
{
    title: 'Paymethod',
    dataIndex: 'paymethod',
    key: 'paymethod',
    width: 100,
},  
{
    title: 'Status',
    dataIndex: 'status',
    key: 'status', 
    width: 100,
},
{
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (a) => <div>
    <Button>Confirm</Button>
    </div>,
},
];
const data = [
{
    key: '1', 
    date: "2022-10-12 | 2022-11-12",
    orderId: 4556161,
    price: "3220$",
    surename: "Batbayar",
    lastname: "Amarbayar",
    invoiceNumber: "ab2s0000",
    address: "altai hothon 24-69a",
    email: "amarbayarbatbayar@gmail.com",
    description: 'Description',
    // orgName: "Obortech",
    status: 1,
    action: 1, 
}, 
{
key: '2', 
date: "2022-10-12 | 2022-11-12",
orderId: 45561441,
price: "6220$",
invoiceNumber: "ab2s5646",
surename: "Batbold",
lastname: "Tuya",
address: "Svhbaatar 24-69a",
email: "tuya@gmail.com",
description: 'Description',
description: 'Description 2',
// orgName: "Obortech2",
status: 2,
action: 1, 
paymethod: 1,

}, 
];
    return <div>
       <div style={{fontWeight: "560", fontSize: "16px", color: "#4d5052", marginBottom: "10px"}}>Invoice Request</div>
       <Search placeholder="input search text" onSearch={onSearch} style={{width:300, marginBottom: "10px"}}/>
            <div>
                <Table bordered columns={columns} dataSource={data} scroll={{x: 1700,}}/>
        </div>
    </div>
}
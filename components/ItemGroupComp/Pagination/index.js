import { Pagination } from "antd";

const PaginationComp = () =>{
    return<div>
        <Pagination defaultCurrent={6} total={500} />
    </div>
}
export default PaginationComp;
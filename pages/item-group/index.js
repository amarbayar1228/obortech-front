import { Empty } from "antd";
import BaseLayout from "../../components/Layout/BaseLayout"
import BasketContext from "../../context/basketContext/BasketContext";

const ItemGroups = () =>{
    return<BaseLayout pageName="item-group">
        <div>
            {BasketContext.orgId === undefined ? <Empty /> 
            : <div> 
                Item Group
            </div>    
        }
        </div>
    </BaseLayout>
}
export default ItemGroups;
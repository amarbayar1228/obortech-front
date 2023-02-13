import { Empty } from "antd";
import { useContext } from "react";
import BaseLayout from "../../components/Layout/BaseLayout"
import BasketContext from "../../context/basketContext/BasketContext";

const ItemGroups = () =>{
    const basketContext = useContext(BasketContext);
    return<BaseLayout pageName="item-group">
        <div>
            {basketContext.orgId === undefined ? <Empty /> 
            : <div> 
                Item Group
            </div>    
        }
        </div>
    </BaseLayout>
}
export default ItemGroups;

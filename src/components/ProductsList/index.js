import React, { useEffect, useState ,Suspense} from "react";
import {useStore,useSelector } from "react-redux";
const ItemsList = React.lazy(() => import('../ItemsList'));
const _ItemsList = (props)=>{
    const products = useSelector(state => {
        let { products :[] } = state;
        return products;
    });
    console.log(products);
    const [ItemList, setItemList] = useState([]);
    useEffect(() => {
        let sortOptions =[];
        if (products && products.length) {
            products.map((_item,index) => {
                return sortOptions.push({
                    label: _item.Type,
                    value: _item.Type,
                    key: index
                });
            })
        }
        setItemList(sortOptions);
    }, [products]);
    return(
         <Suspense fallback={<div>Loading...</div>}>
        <ItemsList products={products} ItemList={ItemList}/>
        </Suspense>
    );
}
export default _ItemsList;
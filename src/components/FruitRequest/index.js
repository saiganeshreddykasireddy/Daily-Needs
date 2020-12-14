import React, { useEffect, useState } from "react";
import {useStore,useSelector } from "react-redux";
import ItemrequestDataTable from "../ItemrequestDataTable";

import { connect } from 'react-redux'

// import "./style.scss";
const ItemPriceList = [
    { "Brand": "Mangoes", "Price": 100 },
    { "Brand": "Mosambi", "Price": 60 },
    { "Brand": "Sapota", "Price": 40 },
    { "Brand": "Banana", "Price": 26 },
    { "Brand": "Pappaya", "Price": 28 },
   
];


const FruitRequests = (props) => {

    const FruitRequests = useSelector(state => {
        let { FruitRequests} = state;
        return FruitRequests;
    });
    const [ItemList, setItemList] = useState([]);
    useEffect(() => {
        let _ItemList = [];
        if (ItemPriceList && ItemPriceList.length) {
            ItemPriceList.map((_items) => {
                _ItemList.push(_items.Brand);
            })
        }
        setItemList(_ItemList);
    }, [FruitRequests]);
    return (
        <div>
            <ItemrequestDataTable key="FruitRequests" requests={FruitRequests} requestsType="FruitRequests" brandList={ItemList} ItemPriceList={ItemPriceList} />
        </div>
    );

}

export default FruitRequests;















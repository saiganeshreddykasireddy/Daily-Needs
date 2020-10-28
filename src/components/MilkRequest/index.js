import React, { useEffect, useState } from "react";
import {useStore,useSelector } from "react-redux";
import ItemrequestDataTable from "../ItemrequestDataTable";

import { connect } from 'react-redux'

// import "./style.scss";
const ItemPriceList = [
    { "Brand": "Amul", "Price":30 },
    { "Brand": "Heritage", "Price": 30 },
    { "Brand": "Vijaya", "Price": 40 },
    { "Brand": "Jersy", "Price": 30 },
    { "Brand": "Jersy full", "Price": 40  },
    { "Brand": "Heritage full", "Price": 40 },
    { "Brand": "Amul full", "Price": 40 }
];


const MilkRequest = (props) => {

    const MilkRequests = useSelector(state => {
        let { Requests: { MilkRequests } } = state;
        return MilkRequests;
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
    }, [MilkRequests]);
    return (
        <div>
            <ItemrequestDataTable key="MilkRequests" requests={MilkRequests} requestsType="MilkRequests" brandList={ItemList} ItemPriceList={ItemPriceList} />
        </div>
    );

}

export default MilkRequest;















import React, { useEffect, useState } from "react";
import {useStore,useSelector } from "react-redux";
import ItemrequestDataTable from "../ItemrequestDataTable";

import { connect } from 'react-redux'

// import "./style.scss";
const ItemPriceList = [
    { "Brand": "Eenadu", "Price": 6 },
    { "Brand": "Sakshi", "Price": 7 },
    { "Brand": "Hindu", "Price": 10 },
    { "Brand": "Andhrajyothy", "Price": 2 },
    { "Brand": "Times Of India", "Price": 8 },
    { "Brand": "Economic Times", "Price": 10 },
    { "Brand": "The Hindu", "Price": 9 }
];


const PaperRequest = (props) => {

    const PaperRequests = useSelector(state => {
        let { Requests: { PaperRequests } } = state;
        return PaperRequests;
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
    }, [PaperRequests]);
    return (
        <div>
            <ItemrequestDataTable key="PaperRequests" requests={PaperRequests} requestsType="PaperRequests" brandList={ItemList} ItemPriceList={ItemPriceList} />
        </div>
    );

}

export default PaperRequest;















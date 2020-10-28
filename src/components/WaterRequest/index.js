import React, { useEffect, useState } from "react";
import {useStore,useSelector } from "react-redux";
import ItemrequestDataTable from "../ItemrequestDataTable";

import { connect } from 'react-redux'

// import "./style.scss";
    const ItemPriceList =[
        {"Brand":"Aquapure","Price": 40},
        {"Brand":"Bisleri","Price": 100},
        {"Brand":"Kinley","Price": 70},
        {"Brand":"Bailey","Price": 50}
        
        ];
        const waterstockData=[
            ["Aquapure",100], 
            ["Bisleri",12],
            ["Kinley",35],
            ["Bailey",30]
        ];

const WaterRequest = (props) => {

    const WaterRequests = useSelector(state => {
        let { Requests: { WaterRequests } } = state;
        return WaterRequests;
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
    }, [WaterRequests]);
    return (
        <div>
            <ItemrequestDataTable key="WaterRequests" requests={WaterRequests} requestsType="WaterRequests" brandList={ItemList} ItemPriceList={ItemPriceList} waterstockData={waterstockData} />
        </div>
    );

}

export default WaterRequest;















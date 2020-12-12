  
import React, { useEffect, useState, Suspense } from "react";
import { useStore, useSelector } from "react-redux";
import _ from "lodash";
import "./Dashboard.scss";

 const DashboardCards = (props) => {
   let {allRequests} = props;
    let itemTypes = Object.keys(allRequests) || {};
    return itemTypes.map((key) => {
        let RequestsOfSameType = Object.values(allRequests[key]) || [];
        const data = _.groupBy(RequestsOfSameType, "Brand")||{};
        console.log(data,"data");
        const cardsData = [];
        Object.keys(data).forEach(function (_key,index) {
            let count = data[_key];
            let _count =0;
            console.log(count,"count");
            count.map((_Item)=>{
                _count = _count+_Item.Quantity;
            })
            let Data = [_key, _count] || [];
            cardsData.push(Data);
        });
        cardsData.sort();
        return (
            <React.Fragment>
                <div className="CardsList">
                <div className="Cardheader">{key}</div>
                <div className="Cardcontent">
                    {cardsData&& cardsData.length ? cardsData.map((_item) => {
                        return <div className="List"><span className="brandname">{_item[0]}</span><span className="brandcount">{_item[1]}</span></div>
                    }) : <p>No Orders Found</p>}
                </div>
                </div>
            </React.Fragment>
        );
      
    })


}
export default DashboardCards;
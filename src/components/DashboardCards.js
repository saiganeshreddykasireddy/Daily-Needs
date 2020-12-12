  
import React, { useEffect, useState, Suspense } from "react";
import { useStore, useSelector } from "react-redux";
import _ from "lodash";
import "./Dashboard.scss";

 const DashboardCards = (props) => {
   let {allRequests} = props;
    let itemTypes = Object.keys(allRequests) || {};
    return itemTypes.map((key) => {
        let RequestsOfSameType = Object.values(allRequests[key]) || [];
        const data = _.groupBy(RequestsOfSameType, "Brand");
        const pieData = [];
        Object.keys(data).forEach(function (key) {
            let Data = [key, data[key].length] || [];
            pieData.push(Data);
        });
        pieData.sort();
        return (
            <React.Fragment>
                <div className="CardsList">
                <div className="Cardheader">{key}</div>
                <div className="Cardcontent">
                    {pieData&& pieData.length ? pieData.map((_item) => {
                        return <div className="List"><span className="brandname">{_item[0]}</span><span className="brandcount">{_item[1]}</span></div>
                    }) : <p>No Orders Found</p>}
                </div>
                </div>
            </React.Fragment>
        );
      
    })


}
export default DashboardCards;
import React, { useEffect, useState, Suspense } from "react";
import { useStore, useSelector } from "react-redux";
import _ from "lodash";
import DashboardCards from"./DashboardCards";
import "./Dashboard.scss";

export const Dashboard = () => {
    const _requests = useSelector(state => {
        let { Requests } = state;
        return Requests;
    });
    const requests = useSelector(state => {
        let { AdvancedRequests } = state;
        return AdvancedRequests;
    });
    const FruitRequests = useSelector(state=>{
        let {FruitRequests} = state;
        return FruitRequests;
    })
    const AdvancedFruitRequests = useSelector(state=>{
        let {AdvancedFruitRequests} = state;
        return AdvancedFruitRequests;
    })
    let REQuests,reQuests;
    // if(FruitRequests&&FruitRequests.length){
         REQuests= {..._requests};
         reQuests ={...requests};
         reQuests["FruitRequests"] = AdvancedFruitRequests;
        REQuests["FruitRequests"] = FruitRequests;
    // }
return(
    <React.Fragment>
        <div className="dashboard_main_block">
        <div className="delivered_list_header">Todays Dashboard</div>
        <div className="cards_block">
        <DashboardCards allRequests={REQuests}/>

        </div>
        </div>
        <div className="dashboard_main_block">
        <div className="delivered_list_header">Tommorow Orders</div>
        <div className="cards_block">
        <DashboardCards allRequests={reQuests}/>

        </div>
        </div>
    </React.Fragment>
)

}

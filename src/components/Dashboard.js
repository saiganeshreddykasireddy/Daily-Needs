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
return(
    <React.Fragment>
        <div className="dashboard_main_block">
        <div className="delivered_list_header">Todays Dashboard</div>
        <div className="cards_block">
        <DashboardCards allRequests={_requests}/>

        </div>
        </div>
        <div className="dashboard_main_block">
        <div className="delivered_list_header">Tommorow Orders</div>
        <div className="cards_block">
        <DashboardCards allRequests={requests}/>

        </div>
        </div>
    </React.Fragment>
)

}

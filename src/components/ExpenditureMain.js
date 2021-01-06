import React, { useEffect, useState ,Suspense} from "react";
import {useStore,useSelector } from "react-redux";
import Expenditure from "../components/Expenditure";
const ExpenditureListItems = React.lazy(() => import('./ExpenditureMain'));
 const ExpenditureMain =()=>{
    const ExpenditureList = useSelector(state => {
        let { ExpenditureList :[] } = state;
        return state.ExpenditureList;
    });

 
    return(
         <Suspense fallback={<div>Loading...</div>}>
       { ExpenditureList&& ExpenditureList.length ? <Expenditure ExpenditureList={ExpenditureList} hiiii={"kkkkk"}/> :""}
        </Suspense>
    );}
export default ExpenditureMain;


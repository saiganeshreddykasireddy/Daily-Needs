import React, { useEffect, useState ,Suspense} from "react";
import {useStore,useSelector } from "react-redux";
const FlatsActivation = React.lazy(() => import('../FlatsActivation'));
const _FlatsActivation = (props)=>{
    const FlatsList = useSelector(state => {
        let { FlatsList :[] } = state;
        return FlatsList;
    });
 
    return(
         <Suspense fallback={<div>Loading...</div>}>
        <FlatsActivation FlatsList={FlatsList} />
        </Suspense>
    );
}
export default _FlatsActivation;
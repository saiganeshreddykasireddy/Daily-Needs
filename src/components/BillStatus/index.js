import React ,{Suspense} from 'react';
// import BillStatus from "./BillStatus";
import {useStore,useSelector } from "react-redux";
const BillStatus = React.lazy(() => import('./BillStatus'));


const _BillStatus = () => {
    const _requests = useSelector(state => {
        let { billStatus } = state;
        return billStatus;
    });
        return (
            <Suspense fallback={<div>Loading...</div>}>
            {_requests&&_requests.length ? <BillStatus billStatus={_requests}/>  :""}
             </Suspense>

        )
}

export default _BillStatus;
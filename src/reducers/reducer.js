import _ from "lodash";

const initialState = {
    Requests: [],
    products:[],
    FlatsList:[]
  }
  
  export default function reducers(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_WATER_REQUESTS':
        return {
          ...state,
          Requests: action.payload
        };
        case 'FETCH_PRODUCTS':
        return {
          ...state,
          products: action.payload
        };
        case 'FETCH_FLATS':
        return {
          ...state,
          FlatsList: action.payload
        };
      case 'EDIT_WATER_REQUESTS':
        const udpatedRecords = [];
        let reqType= action.payload.requestsType;
        let finaldata ;
        for (let index = 0; index < state.Requests[reqType].length; index++) {
          const record = state.Requests[reqType][index];
          record.editMode = (action.payload.data[index].Flat === record.Flat);
          state.Requests[reqType][index] = record;  
          finaldata =  state.Requests;
        }
        console.log(' EDIT_EMPLOYEE ', finaldata);
        return Object.assign({
          ...state,
          Requests: finaldata
        });
  
       
  
      case 'DELETE_WATER_REQUESTS':
        let ReqType= action.payload.requestsType;
        let updatedRequest;
        console.log(action.payload.rowdata.Flat);
        const _updatedRequests = state.Requests[ReqType].filter(rowData => rowData !== action.payload.rowdata);
        state.Requests[ReqType] = _updatedRequests;
        updatedRequest  = state.Requests;
        return Object.assign({
          ...state,
          Requests: updatedRequest
        });
  

      case 'ADD_WATER_REQUESTS':
      const requesttype = action.payload.requestsType;
      let updateRequests;
        const addedRequests = state.Requests[requesttype].concat(action.payload.newdata);
        state.Requests[requesttype] = addedRequests;
        updateRequests  = state.Requests; 
         return Object.assign({
          ...state,
          Requests: updateRequests
        });


        case 'EDIT_PRODUCTS_LIST':
          const record = action.payload.data;
          // for (let index = 0; index < state.Requests.length; index++) {
          //   const record = state.Requests[index];
          //   record.editMode = (action.payload.Flat === record.Flat);
          // }
          return Object.assign({
            ...state,
            products: record
          });
    
         
    
        // case 'DELETE_PRODUCT':
        //   let ReqType= action.payload.requestsType;
        //   let updatedRequest;
        //   console.log(action.payload.rowdata.Flat);
        //   updatedRequest  = state.Requests;
        //   return Object.assign({
        //     ...state,
        //     Requests: updatedRequest
        //   });
    
  
        // case 'ADD_NEW_PRODUCT':
        // const requesttype = action.payload.requestsType;
        // let updateRequests;
        //   const addedRequests = state.Requests[requesttype].concat(action.payload.newdata);
        //   state.Requests[requesttype] = addedRequests;
        //   updateRequests  = state.Requests; 
        //    return Object.assign({
        //     ...state,
        //     Requests: updateRequests
        //   });
  
      default:
        return state;
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
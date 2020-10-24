import _ from "lodash";

const initialState = {
    Requests: [],
  }
  
  export default function reducers(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_WATER_REQUESTS':
        return {
          ...state,
          Requests: action.payload
        };
        case 'POST_WATER_REQUESTS':
        return {
          ...state,
          Requests: action.payload
        };
  
  
      
  
  
      case 'EDIT_WATER_REQUESTS':
        const udpatedRecords = [];
        let reqType= action.payload.requestsType;
        console.log(state.Requests,reqType);
        // let finalData =Object.entries(state.Requests);

        for (let index = 0; index < state.Requests.reqType.length; index++) {
          const record = state.Requests.reqType[index];
          record.editMode = (action.payload.Flat === record.Flat);
          udpatedRecords.push(record);
        }
        console.log(' EDIT_EMPLOYEE ', udpatedRecords);
        return Object.assign({
          ...state,
          Requests: udpatedRecords
        });
  
       
  
      case 'DELETE_WATER_REQUESTS':
        const updatedRequests = state.Requests.filter(rowData => rowData.Flat !== action.payload.Flat);
        return Object.assign({
          ...state,
          Requests: updatedRequests
        });
  
      case 'ADD_WATER_REQUESTS':
        const addedEmployees = state.Requests.concat(rowData => rowData.Flat !== action.payload.Flat);
        console.log(action.payload)
        return Object.assign({
          ...state,
          Requests: addedEmployees
        });
  
      default:
        return state;
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
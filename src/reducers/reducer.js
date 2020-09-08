const initialState = {
    Requests: [],
  }
  
  export default function reducers(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_WATER_REQUESTS':
        console.log(action.type);
        return {
          ...state,
          Requests: action.payload
        };
  
  
      
  
  
      case 'EDIT_WATER_REQUESTS':
        const udpatedRecords = [];
        for (let index = 0; index < state.Requests.length; index++) {
          const record = state.Requests[index];
          record.editMode = (action.payload.empId === record.id);
          udpatedRecords.push(record);
        }
        console.log(' EDIT_EMPLOYEE ', udpatedRecords);
        return Object.assign({
          ...state,
          Requests: udpatedRecords
        });
  
       
  
      case 'DELETE_WATER_REQUESTS':
        const updatedEmployees = state.Requests.filter(emp => emp.id !== action.payload.empId);
        console.log(updatedEmployees)
        return Object.assign({
          ...state,
          Requests: updatedEmployees
        });
  
      case 'ADD_WATER_REQUESTS':
        // return state.concat([action.data]);
        const addedEmployees = state.Requests.concat(emp => emp.id !== action.payload.name);
        console.log(addedEmployees)
        return Object.assign({
          ...state,
          Requests: addedEmployees
        });
  
      default:
        return state;
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
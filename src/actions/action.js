import axios from 'axios';

export const getwaterRequests = () => {
  return (dispatch) => {
    let res = axios.get('http://localhost:3008/Requests')
      .then(res => {
        console.log(res.data);
        dispatch({
          type: 'FETCH_WATER_REQUESTS',
          payload: res.data
        });
      })
  }
}

export const editRequests = (Flat) => {
  console.log('in editEmployee', Flat);
  return (dispatch) => {
    dispatch({
      type: "EDIT_WATER_REQUESTS",
      payload: {
        Flat
      }
    })
  }
}


export const deleteWaterRequests = (Flat) => {
  console.log('in deleteEmployee ', Flat);
  return (dispatch) => {
    dispatch({
      type: "DELETE_WATER_REQUESTS",
      payload: {
        Flat
      }
    });
  }
}

export const addEmployee = (name) => {
  for (let key in name) {
    alert(key + ":" + name[key]);
  }
  return (dispatch) => {
    dispatch({
      type: "ADD_WATER_REQUESTS",
      payload: name
    });
  }
}


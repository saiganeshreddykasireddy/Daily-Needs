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

//  export const postWaterRequests = (requests) => {
//   return (dispatch) => {
//     let res = axios.post('http://localhost:3008/Requests',{
//       requests
//     });
//       // .then(res => {
//       //   console.log(res.data);
//       //   dispatch({
//       //     type: 'POST_WATER_REQUESTS',
//       //     payload: res.data
//       //   });
//       // })
//   }
//  }


//  export const updateRequest = (requests) => { //your action, using thunk here
//   return dispatch => {
//    fetch('http://localhost:3008/Requests', {
//         method: "POST",
//         body: JSON.stringify(requests),            
//     })
//     .catch(err => {
//       console.log(err);
//       alert("Profile update failed, please try again!");
//     })
//     .then(res => {
//         dispatch(postWaterRequests(requests));
//     });
//    }
// }

// export const postWaterRequests = requests => {
//   console.log(requests);
//   return {
//     type: "POST_WATER_REQUESTS",
//     payload: {
//     requests
//     }
//   };
// };

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


export const deleteWaterRequest = (Flat) => {
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

export const addWaterRequest = (Flat) => {
 
  return (dispatch) => {
    dispatch({
      type: "ADD_WATER_REQUESTS",
      payload: Flat
    });
  }
}


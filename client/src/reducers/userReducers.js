// ///import token from "morgan";
// import { USER_LOGIN_FAILED, USER_LOGIN_LOADING, USER_LOGOUT, USER_LOGIN_SUCCESS, USER_REGISTER_FAILED, USER_REGISTER_LOADING, USER_REGISTER_SUCCESS, SET_USER } from "../constants/userConstants";
// import { isEmpty } from 'lodash';

// const initialState = {
//   isConnected: false,
//   user: {},
// }                 

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case USER_REGISTER_LOADING:
//       return { ...state, loading: true }
//     case USER_REGISTER_SUCCESS:
//       localStorage.setItem('token', action.payload.token);
//       localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
//       return {
//         ...state,
//         loading: false,
//         token: action.payload.token,
//         userInfo: action.payload.user,
//         errors: null
//       };
//     case USER_REGISTER_FAILED:
//       return { ...state, loading: false, errors: action.payload };
//     case USER_LOGIN_LOADING:
//       return { ...state, loading: true }
//     case USER_LOGIN_SUCCESS:
//       console.log("//////////");
//       console.log(action.payload);
//       return {
//         ...state,
//         isConnected: !isEmpty(action.payload),
//         user: action.payload,
//       };
//     case SET_USER:
//       return {
//         ...state,
//         isConnected: !isEmpty(action.payload),
//         user: action.payload,
//       };
//     case USER_LOGIN_FAILED:
//       return { ...state, loading: false, errors: action.payload };

//     case USER_LOGOUT:
//       localStorage.removeItem('token');
//       localStorage.removeItem('userInfo');
//       localStorage.removeItem('isAuth');
//       return {
//         ...state,
//         loading: false,
//         errors: null,
//         userInfo: {},
//         token: null,
//         isAuth: false,
//       };


//     default:
//       return state;
//   }
// }
// export default userReducer;
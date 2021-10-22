export const initialState = {IamACoolPlaceHolderhahahhahaha: "", organizations: []}
// import { ReactSession } from 'react-client-session';
// var initialState1;
// if (ReactSession.get('user')) {
//     initialState1 = JSON.parse(ReactSession.get('user'))
// }
// else {
//     initialState1 = {IamACoolPlaceHolderhahahhahaha: ""}
// }
// export const initialState = initialState1;

export const reducer = (state, action)=> {
    if(action.type === "USER"){
        return action.payload
    }
    if(action.type === "CLEAR"){
        return null
    }
    if(action.type === "UPDATE"){
        return {
            ...state,
            followers: action.payload.followers,
            following: action.payload.following
        }
    }
    if(action.type === "UPDATEPIC"){
        return {
            ...state,
            pic: action.payload
        }
    }

    return state
}
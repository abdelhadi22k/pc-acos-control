import * as actions from "./actionType";



export const userSignin= ( data ) => {
    return {
      type: actions.USER_SIGNIN,
      payload: data ,
      
    };
  };

  export const userSignout = () => {
    return {
        type: actions.USER_SIGNOUT,
        
    };
  };









  
import * as actions from "./actionType";



export const cartAddItem = (item , count) => {
    return {
      type: actions.CART_ADD_ITEM,
      payload:item , count,
    };
  };

  export const cartRemoveItem = (item) => {
    return {
        type: actions.CART_REMOVE_ITEM,
         payload:item ,

    };
  };

  export const cartClierItem = () => {
    return {
        type: actions.CART_CLEAR,
    };

  }; 



  export const saveShpingAddres = ( ) => {
    return {
        type: actions.SAVE_SHIPPING_ADDRESS,
    };

  }
  export const troyspaymentMethod = ( ) => {
    return {
        type: actions.SAVE_PAYMENT_METHOD,
    };
 
  }

  
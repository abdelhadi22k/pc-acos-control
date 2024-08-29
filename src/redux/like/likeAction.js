import * as actions from "./actionType";



export const likeAddItem = (item , count) => {
    return {
      type: actions.LIKE_ADD_ITEM,
      payload:item , count,
    };
  }; 

  export const likeRemoveItem = (item) => {
    return {
        type: actions.LIKE_REMOVE_ITEM,
         payload:item ,

    };
  };

  export const likeClierItem = () => {
    return {
        type: actions.LIKE_CLEAR,
    };

  }; 




  
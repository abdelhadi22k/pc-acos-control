import * as actions from "./actionType";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_SIGNIN:
      return { ...state, userInfo: action.payload };

    case actions.USER_SIGNOUT: {
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: "",
        },
      };
    }

    default:
      return state;
  }
};

export default reducerUser;

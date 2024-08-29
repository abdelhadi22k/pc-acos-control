import { combineReducers } from "redux";
import reducerCart from './cart/cartReducer';
import reducerUser from "./user/userReducer";
import reducerlike from "./like/likeReducer";
export const rootReduser = combineReducers({
  cart:reducerCart,
  like:reducerlike,
  user:reducerUser
});

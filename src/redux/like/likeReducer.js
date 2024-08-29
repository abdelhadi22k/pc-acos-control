import * as actions from "./actionType";

const initialState = {
  like: {
    likeItems: localStorage.getItem("likeItems")
      ? JSON.parse(localStorage.getItem("likeItems"))
      : [],
  },
};

const reducerLike = (state = initialState, action) => {
  switch (action.type) {
    // add to cart

    case actions.LIKE_ADD_ITEM:
      const newItem = action.payload;
      const existItem = state.like.likeItems.find(
        (item) => item._id === newItem._id
      );
      const likeItems = existItem
        ? state.like.likeItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.like.likeItems, newItem];
      localStorage.setItem("likeItems", JSON.stringify(likeItems));
      return { ...state, like: { ...state.like, likeItems } };

    // remove to cart

    case actions.LIKE_REMOVE_ITEM: {
      const likeItems = state.like.likeItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("likeItems", JSON.stringify(likeItems));
      return { ...state, like: { ...state.like, likeItems } };
    }

    // clier the cart

    case actions.LIKE_CLEAR:
      return { ...state, like: { ...state.like, likeItems: [] } };

    default:
      return state;
  }
};

export default reducerLike;

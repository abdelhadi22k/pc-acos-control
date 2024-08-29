import { createStore ,applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from 'redux-logger'
import { rootReduser } from "./rootReducer.js"; 



export const store = createStore(
    rootReduser ,
    composeWithDevTools(applyMiddleware(logger, thunk))
    )
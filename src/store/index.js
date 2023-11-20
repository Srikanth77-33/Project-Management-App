import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { tableReducer } from "./table/tableReducer";

const rootReducer = combineReducers({ table: tableReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

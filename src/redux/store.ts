import { combineReducers, legacy_createStore as createStore } from "redux";
import listReducer from "./reducers/list";

const rootReducer = combineReducers({
    listUser: listReducer
})

export const store = createStore(rootReducer);
import { combineReducers, legacy_createStore as createStore } from "redux"
import messages from "../module/messages";

const rootReducer = combineReducers({
  messages
})

export const store = createStore(rootReducer);
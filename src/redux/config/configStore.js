import { combineReducers, legacy_createStore as createStore } from "redux"
import messages from "../module/messages";

// COMBINED REDUCER
const rootReducer = combineReducers({
  messages
})

// STORE
export const store = createStore(rootReducer);
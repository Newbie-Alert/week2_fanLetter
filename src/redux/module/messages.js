// ACTION VALUE
const ADD_MSG = "ADD_MSG"
const DELETE_MSG = "DELETE_MSG"
const EDIT_MSG = "EDIT_MSG"

// ACTION VALUE CREATOR
export const addTask = (msg) => {
  return { type: ADD_MSG, payload: msg }
}

export const deleteTask = (target) => {
  return { type: DELETE_MSG, payload: target }
}

export const editTask = (target, text) => {
  return { type: EDIT_MSG, payload: text, target }
}

// initValue
const initialValue = []

// reducer
const messages = (state = initialValue, action) => {
  switch (action.type) {
    case ADD_MSG:
      return [action.payload, ...state]
    case DELETE_MSG:
      return state = state.filter(msg => msg.id !== action.payload)
    case EDIT_MSG:
      let copy = [...state]
      let found = copy.find(el => el.id === action.target.id)
      found.text = action.payload;
      return copy
    default:
      return state
  }
}


export default messages

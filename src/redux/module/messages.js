// ACTION VALUE
const ADD_TASK = "ADD_TASK"
const DELETE_TASK = "DELETE_TASK"
const EDIT_TASK = "EDIT_TASK"

// ACTION CREATOR
export const addTask = (task) => {
  return { type: ADD_TASK, payload: task }
}

export const deleteTask = (target) => {
  return { type: DELETE_TASK, payload: target }
}

export const editTask = (target, text) => {
  return { type: EDIT_TASK, payload: text, target }
}

// initValue
const initialValue = []


// reducer
const messages = (state = initialValue, action) => {
  switch (action.type) {
    case ADD_TASK:
      return state = [action.payload, ...state]
    case DELETE_TASK:
      return state = state.filter(msg => msg.id !== action.payload)
    case EDIT_TASK:
      let found = state.find(el => el.id === action.target.id)
      found.text = action.payload;
      return state
    default:
      return state
  }
}


export default messages
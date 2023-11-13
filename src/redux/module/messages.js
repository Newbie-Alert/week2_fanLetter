// ACTION VALUE
const ADD_TASK = "ADD_TASK"
const DELETE_TASK = "DELETE_TASK"
const EDIT_TASK = "EDIT_TASK"

// ACTION CREATOR
export const addTask = (task) => {
  return { type: ADD_TASK, payload: task }
}

export const deleteTask = (filteredTask) => {
  return { type: DELETE_TASK, payload: filteredTask }
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
      return state = [...action.payload]
    case EDIT_TASK:
      action.target.text = action.payload
      return state;
    default:
      return state
  }
}


export default messages
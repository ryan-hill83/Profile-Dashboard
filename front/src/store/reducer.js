const initialState = {
    isAuthenticated: false,
    user: {}
  }
  
  const reducer = (state = initialState,action) => {
    if(action.type === "LOG_IN_USER") {
      return {
        ...state,
        isAuthenticated : true
      }}
    if(action.type === "SEND_USER_INFO") {
      return {
        ...state,
        user : action.user
      }}
    if(action.type === "LOG_OUT") {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }}
    return state
  }
  
  export default reducer
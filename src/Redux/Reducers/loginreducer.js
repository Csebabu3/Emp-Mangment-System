import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../Types";

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, isAuthenticated: true, user: action.payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export default authReducer;
